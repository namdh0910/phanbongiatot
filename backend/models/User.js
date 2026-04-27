const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['super_admin', 'admin', 'vendor', 'customer'], 
    default: 'customer' 
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'banned'],
    default: 'active'
  },
  sellerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  lastLoginAt: {
    type: Date
  },
  // Legacy Vendor specific info (keeping for compatibility during transition)
  vendorInfo: {
    storeName: String,
    phone: String,
    address: String,
    isApproved: { type: Boolean, default: false },
    description: String,
    logo: String,
    banner: String,
    zaloPhone: String,
    facebookUrl: String,
    plan: { type: String, enum: ['trial', 'pro', 'premium'], default: 'trial' },
    trialExpiresAt: { 
      type: Date, 
      default: () => new Date(+new Date() + 30*24*60*60*1000) // Mặc định 30 ngày
    },
    isPremium: { type: Boolean, default: false },
    numReviews: { type: Number, default: 0 },
    numProducts: { type: Number, default: 0 },
    numFollowers: { type: Number, default: 0 },
    commissionRate: { type: Number, default: 10 }, // % hoa hồng sàn thu
    totalRevenue: { type: Number, default: 0 },
    balance: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
