const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'vendor', 'customer'], 
    default: 'customer' 
  },
  // Vendor specific info
  vendorInfo: {
    storeName: String,
    phone: String,
    address: String,
    isApproved: { type: Boolean, default: false },
    description: String,
    logo: String,
    plan: { type: String, enum: ['trial', 'pro', 'premium'], default: 'trial' },
    trialExpiresAt: { 
      type: Date, 
      default: () => new Date(+new Date() + 30*24*60*60*1000) // Mặc định 30 ngày
    },
    isPremium: { type: Boolean, default: false }
  }
}, { timestamps: true });

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
