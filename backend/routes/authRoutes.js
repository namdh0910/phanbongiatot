const express = require('express');
const router = express.Router();
const User = require('../models/User');
const rateLimit = require('express-rate-limit');
const { authUser, registerUser, registerVendor, getVendors, approveVendor, extendVendor, getProfile, updateProfile, sendOtp, verifyOtp } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Thử đăng nhập quá nhiều lần. Vui lòng quay lại sau 15 phút.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, authUser);
router.post('/register-vendor', registerVendor);
router.get('/vendors', protect, admin, getVendors);
router.put('/vendors/:id/approve', approveVendor);
router.put('/test-approve/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.vendorInfo.isApproved = req.body.isApproved;
    await user.save();
    res.json({ message: 'TEST SUCCESS' });
  } catch (err) {
    res.status(500).json({ message: 'TEST FAIL: ' + err.message });
  }
});
router.put('/vendors/:id/extend', protect, admin, extendVendor);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/send-otp', loginLimiter, sendOtp);
router.post('/verify-otp', verifyOtp);
// Register chỉ mở khi chưa có admin nào, controller tự kiểm tra
router.post('/register', registerUser);

module.exports = router;
