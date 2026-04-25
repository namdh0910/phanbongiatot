const AdminLog = require('../models/AdminLog');

const logAdminAction = async (adminId, action, target, details, ip) => {
  try {
    const log = new AdminLog({
      admin: adminId,
      action,
      target,
      details,
      ipAddress: ip
    });
    await log.save();
  } catch (err) {
    console.error('Failed to log admin action:', err);
  }
};

module.exports = { logAdminAction };
