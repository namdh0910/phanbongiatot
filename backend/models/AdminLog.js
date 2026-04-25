const mongoose = require('mongoose');

const adminLogSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    action: { type: String, required: true },
    target: { type: String }, // e.g. "Order PBG-123", "Product Rooti"
    details: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

const AdminLog = mongoose.model('AdminLog', adminLogSchema);
module.exports = AdminLog;
