const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true
    },
    storeName: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    logo: {
      type: String,
      default: 'https://res.cloudinary.com/dvp9f56sh/image/upload/v1714262400/default-shop-logo.png'
    },
    banner: {
      type: String
    },
    description: {
      type: String
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    provinceCode: {
      type: String
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending'
    },
    rejectReason: {
      type: String
    },
    commissionRate: {
      type: Number,
      default: 5.0
    },
    bankAccount: {
      bankName: String,
      accountNumber: String,
      accountName: String
    },
    stats: {
      totalProducts: { type: Number, default: 0 },
      totalOrders: { type: Number, default: 0 },
      ratingAvg: { type: Number, default: 0 },
      ratingCount: { type: Number, default: 0 }
    },
    approvedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
