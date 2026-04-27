const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipientType: {
      type: String,
      enum: ['seller', 'buyer', 'admin'],
      required: true
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'recipientModel'
    },
    recipientModel: {
      type: String,
      required: true,
      enum: ['User', 'Seller']
    },
    type: {
      type: String, // e.g. 'NEW_ORDER', 'ORDER_SHIPPING', 'ORDER_DELIVERED'
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      enum: ['zalo', 'sms', 'in_app'],
      default: 'in_app'
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed', 'read'],
      default: 'pending'
    },
    metadata: {
      orderId: mongoose.Schema.Types.ObjectId,
      trackingCode: String,
      amount: Number
    },
    sentAt: Date
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
