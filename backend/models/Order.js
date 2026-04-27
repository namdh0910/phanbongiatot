const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String,
      required: true,
      unique: true,
    },
    customerInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      province: { type: String },
      district: { type: String },
      ward: { type: String },
      note: { type: String }
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingFee: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discountAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    couponCode: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'BANK_TRANSFER', 'MOMO', 'VNPAY'],
      default: 'COD'
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING'
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['new', 'confirmed', 'shipping', 'done', 'cancelled'],
      default: 'new'
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    parentOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    isParent: {
      type: Boolean,
      default: false
    },
    shippingCode: { // Mã vận đơn GHN/GHTK sau này
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
