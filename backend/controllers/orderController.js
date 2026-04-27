const Order = require('../models/Order');
const Coupon = require('../models/Coupon');
const { sendTelegramMessage } = require('../utils/telegram');
const { 
  notifyOrderReceived, 
  notifyOrderConfirmed, 
  notifyOrderShipping, 
  notifyOrderSuccess 
} = require('../services/notificationService');
const { logAdminAction } = require('../utils/logger');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      customerInfo,
      paymentMethod,
      itemsPrice,
      shippingFee,
      totalPrice,
      couponCode,
      discountAmount,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'Không có sản phẩm nào trong đơn hàng' });
    }

    // 1. Generate Parent Order Code
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = date.getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    const parentOrderCode = `PBG-${dd}${mm}${yy}-${random}`;

    // 2. Create Parent Order
    const parentOrder = new Order({
      orderCode: parentOrderCode,
      orderItems,
      customerInfo,
      paymentMethod,
      itemsPrice,
      shippingFee,
      discountAmount: discountAmount || 0,
      totalPrice,
      couponCode,
      isParent: true,
    });

    // Create/Link customer record
    const User = require('../models/User');
    const cleanPhone = customerInfo.phone.replace(/\s/g, '');
    let customer = await User.findOne({ username: cleanPhone });
    if (!customer) {
      customer = new User({
        username: cleanPhone,
        password: Math.random().toString(36).slice(-8),
        role: 'customer',
        vendorInfo: {
          storeName: customerInfo.name,
          phone: cleanPhone,
          address: `${customerInfo.address}, ${customerInfo.ward}, ${customerInfo.district}, ${customerInfo.province}`
        }
      });
      await customer.save();
    }
    parentOrder.user = customer._id;
    const savedParentOrder = await parentOrder.save();

    // 3. Group items by seller and create sub-orders
    const Product = require('../models/Product');
    const sellerGroups = {};
    const validatedItems = []; // To store snapshots from DB
    
    // Fetch products to get authoritative snapshots and seller info
    for (const item of orderItems) {
      const productDoc = await Product.findById(item.product).populate('seller');
      
      if (!productDoc) {
        return res.status(404).json({ message: `Sản phẩm ID ${item.product} không tồn tại` });
      }

      // Authoritative snapshot from DB (ignores client-sent prices/names)
      const itemSnapshot = {
        product: productDoc._id,
        name: productDoc.name,
        image: productDoc.images?.[0] || '',
        qty: item.qty,
        price: productDoc.price, // Authoritative price
        seller: productDoc.seller?._id || null
      };

      validatedItems.push(itemSnapshot);

      const sellerId = productDoc.seller?._id?.toString() || 'admin';
      
      if (!sellerGroups[sellerId]) {
        sellerGroups[sellerId] = [];
      }
      
      sellerGroups[sellerId].push(itemSnapshot);
      
      // Deduct stock atomicly
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.qty } },
        { $inc: { stock: -item.qty, soldCount: item.qty } },
        { new: true }
      );

      if (!updatedProduct) {
        // Note: Real transaction rollback would be better, but this prevents the order from finalizing
        return res.status(400).json({ 
          message: `Sản phẩm ${productDoc.name} không đủ tồn kho (còn ${productDoc.stock})` 
        });
      }
    }

    // Update parent order with validated items
    savedParentOrder.orderItems = validatedItems;
    await savedParentOrder.save();

    const subOrders = [];
    const sellerIds = Object.keys(sellerGroups);

    // ALWAYS create sub-orders for tracking per seller
    for (const sellerId of sellerIds) {
      const items = sellerGroups[sellerId];
      const subItemsPrice = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
      
      // Simple shipping fee: Parent order holds the full fee for now
      // Sub-orders can have 0 shipping or split proportionally
      const subShippingFee = 0; 
      
      const subOrderCode = `${parentOrderCode}-${subOrders.length + 1}`;
      
      const subOrder = new Order({
        orderCode: subOrderCode,
        orderItems: items,
        customerInfo,
        paymentMethod,
        itemsPrice: subItemsPrice,
        shippingFee: subShippingFee,
        totalPrice: subItemsPrice + subShippingFee,
        parentOrder: savedParentOrder._id,
        seller: sellerId === 'admin' ? null : sellerId,
        isParent: false,
        user: customer._id
      });
      
      const savedSubOrder = await subOrder.save();
      subOrders.push(savedSubOrder);
      
      // Notify seller
      console.log(`[NOTIFY] Seller ${sellerId} received sub-order ${subOrderCode}`);
    }

    // 4. Finalize Parent Order notifications
    const adminMessage = `🛒 Đơn mới #${parentOrderCode}\nKH: ${customerInfo.name} - ${customerInfo.phone}\nTổng: ${totalPrice.toLocaleString('vi-VN')}đ\nSellers: ${sellerIds.length}`;
    await sendTelegramMessage(adminMessage);
    await notifyOrderReceived(savedParentOrder);

    res.status(201).json({
      success: true,
      order: savedParentOrder,
      subOrders: subOrders.length > 0 ? subOrders : undefined
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Track order by code and phone
// @route   GET /api/orders/track
// @access  Public
const trackOrder = async (req, res) => {
  try {
    const { code, phone } = req.query;
    
    if (!code || !phone) {
      return res.status(400).json({ message: 'Vui lòng nhập mã đơn hàng và số điện thoại' });
    }

    const order = await Order.findOne({ 
      orderCode: code,
      'customerInfo.phone': phone.replace(/\s/g, '')
    });

    if (order) {
      // Return structured tracking data
      res.json({
        orderCode: order.orderCode,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        totalPrice: order.totalPrice,
        orderItems: order.orderItems,
        customerInfo: {
          name: order.customerInfo.name,
          address: `${order.customerInfo.address}, ${order.customerInfo.ward}, ${order.customerInfo.district}, ${order.customerInfo.province}`
        },
        shippingCode: order.shippingCode || null,
        // Simulated tracking timeline based on status
        timeline: [
          { status: 'new', label: 'Đặt hàng thành công', date: order.createdAt, isDone: true },
          { status: 'confirmed', label: 'Đã xác nhận', date: order.updatedAt, isDone: ['confirmed', 'shipping', 'done'].includes(order.orderStatus) },
          { status: 'shipping', label: 'Đang giao hàng', date: order.updatedAt, isDone: ['shipping', 'done'].includes(order.orderStatus) },
          { status: 'done', label: 'Đã nhận hàng', date: order.updatedAt, isDone: order.orderStatus === 'done' }
        ]
      });
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn và số điện thoại.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID or Code
// @route   GET /api/orders/:idOrCode
// @access  Public
const getOrderByIdOrCode = async (req, res) => {
  try {
    const { idOrCode } = req.params;
    
    // Check if it looks like an order code or MongoDB ObjectId
    const query = idOrCode.startsWith('PBG-') ? { orderCode: idOrCode } : { _id: idOrCode };
    
    const order = await Order.findOne(query);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      const isAuthorized = req.user.role === 'admin' || req.user.role === 'super_admin' || (order.seller && order.seller.toString() === req.user._id.toString());
      
      if (!isAuthorized) {
        return res.status(403).json({ message: 'Bạn không có quyền cập nhật đơn hàng này' });
      }
      order.orderStatus = req.body.status || order.orderStatus;
      order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
      order.shippingCode = req.body.shippingCode || order.shippingCode;

      const updatedOrder = await order.save();

      // Log action
      await logAdminAction(
        req.user._id,
        'UPDATE_ORDER_STATUS',
        `Order ${updatedOrder.orderCode}`,
        { status: req.body.status, paymentStatus: req.body.paymentStatus },
        req.ip
      );
      
      // Gửi thông báo tự động theo trạng thái mới
      if (req.body.status === 'confirmed') {
        await notifyOrderConfirmed(updatedOrder);
      } else if (req.body.status === 'shipping') {
        await notifyOrderShipping(updatedOrder, updatedOrder.shippingCode);
      } else if (req.body.status === 'done') {
        await notifyOrderSuccess(updatedOrder);
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seller confirm sub-order
// @route   PATCH /api/seller/sub-orders/:id/confirm
const confirmSubOrder = async (req, res) => {
  try {
    const { estimated_ship_date } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order || order.isParent) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    if (order.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Bạn không có quyền xác nhận đơn hàng này' });
    }

    order.orderStatus = 'confirmed';
    // We could store estimated_ship_date in a new field if needed
    const updatedOrder = await order.save();
    
    await notifyOrderConfirmed(updatedOrder);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seller ship sub-order
// @route   PATCH /api/seller/sub-orders/:id/ship
const shipSubOrder = async (req, res) => {
  try {
    const { tracking_code, carrier } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order || order.isParent) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    if (order.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Bạn không có quyền giao đơn hàng này' });
    }

    order.orderStatus = 'shipping';
    order.shippingCode = tracking_code;
    // carrier could be stored in a new field
    const updatedOrder = await order.save();
    
    await notifyOrderShipping(updatedOrder, tracking_code);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders by phone number
// @route   GET /api/orders/phone/:phone
// @access  Public
const getOrdersByPhone = async (req, res) => {
  try {
    const phone = req.params.phone.replace(/\s/g, '');
    const orders = await Order.find({ 'customerInfo.phone': phone }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const { is_parent } = req.query;
    const query = {};
    if (is_parent === 'true') query.isParent = true;
    
    const orders = await Order.find(query)
      .populate('user', 'username vendorInfo')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders for a specific vendor
// @route   GET /api/orders/vendor/me
// @access  Private/Vendor
const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user._id })
      .populate('user', 'username vendorInfo')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderByIdOrCode,
  getOrdersByPhone,
  updateOrderStatus,
  getOrders,
  getVendorOrders,
  trackOrder,
  confirmSubOrder,
  shipSubOrder
};
