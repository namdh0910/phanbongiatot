const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authUser, registerUser, registerVendor, getVendors, approveVendor, extendVendor, getProfile, updateProfile } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');


router.post('/login', authUser);
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
router.put('/profile', protect, updateProfile);
router.get('/profile', protect, getProfile);
// Register chỉ mở khi chưa có admin nào, controller tự kiểm tra
router.post('/register', registerUser);

module.exports = router;
