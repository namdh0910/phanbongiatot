const express = require('express');
const router = express.Router();
const { authUser, registerUser, registerVendor, getVendors, approveVendor, extendVendor } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register-vendor', registerVendor);
router.get('/vendors', protect, admin, getVendors);
router.put('/vendors/:id/approve', protect, admin, approveVendor);
router.put('/vendors/:id/extend', protect, admin, extendVendor);
// Register chỉ mở khi chưa có admin nào, controller tự kiểm tra
router.post('/register', registerUser);

module.exports = router;
