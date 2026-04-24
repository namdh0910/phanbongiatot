const express = require('express');
const router = express.Router();
const { authUser, registerUser, registerVendor } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register-vendor', registerVendor);
// Register chỉ mở khi chưa có admin nào, controller tự kiểm tra
router.post('/register', registerUser);

module.exports = router;
