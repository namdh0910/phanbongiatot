const express = require('express');
const router = express.Router();
const { authUser, registerUser, registerVendor, getVendors, approveVendor } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register-vendor', registerVendor);
router.get('/vendors', protect, getVendors);
router.put('/vendors/:id/approve', protect, approveVendor);
// Register chỉ mở khi chưa có admin nào, controller tự kiểm tra
router.post('/register', registerUser);

module.exports = router;
