const Order = require('../models/Order');
const Coupon = require('../models/Coupon');
const { sendTelegramMessage } = require('../utils/telegram');

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
      // Generate Order Code: PBG-YYMMDD-XXXX
      const date = new Date();
      const dateStr = date.getFullYear().toString().slice(-2) + 
                      String(date.getMonth() + 1).padStart(2, '0') + 
                      String(date.getDate()).padStart(2, '0');
      
      const count = await Order.countDocuments();
      const orderCode = `PBG-${dateStr}-${String(count + 1).padStart(4, '0')}`;

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

      const createdOrder = await order.save();

      // If coupon used, increment usage count
      if (couponCode) {
        await Coupon.findOneAndUpdate(
          { code: couponCode },
          { $inc: { usageCount: 1 } }
        );
      }

      // Gửi thông báo Telegram
      const message = `
<b>🔔 ĐƠN HÀNG MỚI!</b>
------------------------
📦 <b>Mã đơn:</b> ${createdOrder.orderCode}
👤 <b>Khách hàng:</b> ${customerInfo.name}
📞 <b>SĐT:</b> ${customerInfo.phone}
🏠 <b>Địa chỉ:</b> ${customerInfo.address}, ${customerInfo.ward}, ${customerInfo.district}, ${customerInfo.province}

🛒 <b>Sản phẩm:</b>
${orderItems.map(item => `- ${item.name} x${item.qty} (${item.price.toLocaleString()}đ)`).join('\n')}

💰 <b>Tổng tiền:</b> ${totalPrice.toLocaleString()}đ
💳 <b>Thanh toán:</b> ${paymentMethod}
------------------------
<i>Kiểm tra ngay tại: phanbongiatot.vercel.app/admin/orders</i>
      `;
      
      console.log('Đang gửi thông báo đơn hàng qua Telegram...');
      await sendTelegramMessage(message);
      
      res.status(201).json(createdOrder);
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

module.exports = {
  createOrder,
  getOrderByIdOrCode,
  getOrdersByPhone,
  updateOrderStatus,
  getOrders,
};
