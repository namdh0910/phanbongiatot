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
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'Chuyển khoản'],
      default: 'COD'
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['Chưa thanh toán', 'Đã thanh toán', 'Lỗi'],
      default: 'Chưa thanh toán'
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Hoàn thành', 'Đã hủy'],
      default: 'Chờ xác nhận'
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
