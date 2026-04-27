const Notification = require('../models/Notification');
const axios = require('axios');

/**
 * Send Notification Logic
 */
const sendNotification = async ({ recipientType, recipientId, recipientModel, type, title, body, channel = 'in_app', metadata = {} }) => {
  try {
    // 1. Create record
    const notification = await Notification.create({
      recipientType,
      recipientId,
      recipientModel,
      type,
      title,
      body,
      channel,
      metadata
    });

    // 2. Trigger External Channel (Zalo/SMS)
    if (channel === 'zalo') {
      await sendZaloMessage(recipientId, body);
      notification.status = 'sent';
      notification.sentAt = new Date();
      await notification.save();
    } else {
      // For now, in_app is just created as pending/read
      notification.status = 'sent';
      await notification.save();
    }

    return notification;
  } catch (error) {
    console.error(`[Notification Error] ${error.message}`);
  }
};

/**
 * Zalo OA API Implementation (CS Message)
 */
const sendZaloMessage = async (userId, text) => {
  try {
    const accessToken = process.env.ZALO_OA_ACCESS_TOKEN;
    if (!accessToken) {
      console.warn('[Zalo] No access token configured, skipping real send.');
      return;
    }

    // Note: In real world, we need to map userId to Zalo user_id (usually via follower list or phone)
    // For now, we simulate the structure
    const response = await axios.post('https://openapi.zalo.me/v3.0/oa/message/cs', {
      recipient: { user_id: userId }, 
      message: { text }
    }, {
      headers: { 'access_token': accessToken }
    });

    return response.data;
  } catch (error) {
    console.error(`[Zalo Error] ${error.message}`);
  }
};

/**
 * Preset: New Order for Seller
 */
const notifyNewOrder = async (order) => {
  // Notify each seller involved in sub-orders
  const Order = require('../models/Order');
  const subOrders = await Order.find({ parentOrder: order._id });

  for (const sub of subOrders) {
    if (sub.seller) {
      await sendNotification({
        recipientType: 'seller',
        recipientId: sub.seller,
        recipientModel: 'User',
        type: 'NEW_ORDER',
        title: 'Bạn có đơn hàng mới!',
        body: `🛒 Đơn hàng mới #${order.orderCode} từ khách ${order.customer.name}. Vui lòng xác nhận đơn.`,
        channel: 'zalo',
        metadata: { orderId: sub._id }
      });
    }
  }
};

/**
 * Preset: Order Shipping for Buyer
 */
const notifyOrderShipping = async (order) => {
  await sendNotification({
    recipientType: 'buyer',
    recipientId: order._id, // Using order ID as placeholder if no buyer user account
    recipientModel: 'User', 
    type: 'ORDER_SHIPPING',
    title: 'Đơn hàng đang giao',
    body: `🚚 Đơn hàng #${order.orderCode} đang được giao. Mã vận đơn: ${order.shippingCode || 'N/A'}. Quý khách vui lòng chuẩn bị ${order.totalAmount.toLocaleString()}đ để nhận hàng.`,
    channel: 'zalo',
    metadata: { orderId: order._id, trackingCode: order.shippingCode, amount: order.totalAmount }
  });
};

module.exports = {
  sendNotification,
  notifyNewOrder,
  notifyOrderShipping
};
