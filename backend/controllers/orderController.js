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
    } else {
      // Generate Order Code: PBG-DDMMYY-XXXX (4 random digits)
      const date = new Date();
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yy = date.getFullYear().toString().slice(-2);
      const random = Math.floor(1000 + Math.random() * 9000);
      const orderCode = `PBG-${dd}${mm}${yy}-${random}`;

      const order = new Order({
        orderCode,
        orderItems,
        customerInfo,
        paymentMethod,
        itemsPrice,
        shippingFee,
        discountAmount: discountAmount || 0,
        totalPrice,
        couponCode,
      });

      // Create/Link customer record
      const User = require('../models/User');
      const cleanPhone = customerInfo.phone.replace(/\s/g, '');
      let customer = await User.findOne({ username: cleanPhone });
      
      if (!customer) {
        // Create new customer account (using phone as username, no password for now)
        customer = new User({
          username: cleanPhone,
          password: Math.random().toString(36).slice(-8), // Placeholder
          role: 'customer',
          vendorInfo: {
            storeName: customerInfo.name,
            phone: cleanPhone,
            address: `${customerInfo.address}, ${customerInfo.ward}, ${customerInfo.district}, ${customerInfo.province}`
          }
        });
        await customer.save();
      }
      
      order.user = customer._id;
      const createdOrder = await order.save();

      // Deduct stock and increment sold count for each product
      const Product = require('../models/Product');
      for (const item of orderItems) {
        if (item.product) {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { stock: -item.qty, soldCount: item.qty } }
          );
        }
      }

      // If coupon used, increment usage count
      if (couponCode) {
        await Coupon.findOneAndUpdate(
          { code: couponCode },
          { $inc: { usageCount: 1 } }
        );
      }

      // Gửi thông báo Admin (Telegram/Zalo)
      const message = `🛒 Đơn mới #${createdOrder.orderCode}\nKH: ${customerInfo.name} - ${customerInfo.phone}\nSP: ${orderItems.map(i => `${i.name} (x${i.qty})`).join(', ')}\nTổng: ${totalPrice.toLocaleString('vi-VN')}đ`;
      
      console.log('Đang gửi thông báo đơn hàng mới...');
      await sendTelegramMessage(message);

      // Gửi thông báo cho khách
      await notifyOrderReceived(createdOrder);
      
      res.status(201).json(createdOrder);
    }
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
    const orders = await Order.find({}).sort({ createdAt: -1 });
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
    const orders = await Order.find({})
      .populate({
        path: 'orderItems.product',
        select: 'seller'
      })
      .sort({ createdAt: -1 });

    // Lọc những đơn hàng có sản phẩm của vendor này
    const vendorOrders = orders.filter(order => {
      return order.orderItems.some(item => 
        item.product && item.product.seller && item.product.seller.toString() === req.user._id.toString()
      );
    }).map(order => {
      // Chỉ trả về những items thuộc về vendor này
      const filteredItems = order.orderItems.filter(item => 
        item.product && item.product.seller && item.product.seller.toString() === req.user._id.toString()
      );
      
      return {
        ...order._doc,
        orderItems: filteredItems
      };
    });

    res.json(vendorOrders);
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
};
