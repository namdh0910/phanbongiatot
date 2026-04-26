const mongoose = require('mongoose');

const sellerApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  province: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  yearsInBusiness: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  interests: [String],
  channels: [String],
  idCardFront: {
    type: String, // URL to image
  },
  idCardBack: {
    type: String, // URL to image
  },
  businessLicense: {
    type: String, // URL to image (optional)
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  rejectionReason: {
    type: String,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: {
    type: Date,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const SellerApplication = mongoose.model('SellerApplication', sellerApplicationSchema);

module.exports = SellerApplication;
