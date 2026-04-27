const express = require('express');
const router = express.Router();
const { authUser, registerVendor, approveVendor } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Seller Portal Specs
router.post('/register', registerVendor); // POST /api/sellers/register
router.post('/login', authUser);           // POST /api/sellers/login

// Admin approval for sellers
router.patch('/admin/sellers/:id/approve', protect, admin, approveVendor);

// SuperAdmin config for sellers (Commission rate, etc)
const { updateSellerConfig } = require('../controllers/authController');
const { superAdmin } = require('../middleware/authMiddleware');
router.patch('/admin/sellers/:id/config', protect, superAdmin, updateSellerConfig);

module.exports = router;
