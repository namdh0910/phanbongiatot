const express = require('express');
const router = express.Router();
const { authUser, registerVendor, approveVendor } = require('../controllers/authController');
const { getSellerDashboard, getSellerRevenue } = require('../controllers/sellerController');
const { protect, admin } = require('../middleware/authMiddleware');

// Seller Portal Specs
router.post('/register', registerVendor); // POST /api/sellers/register
router.post('/login', authUser);           // POST /api/sellers/login

// Analytics
router.get('/dashboard', protect, getSellerDashboard);
router.get('/revenue', protect, getSellerRevenue);

// Admin approval for sellers
const Seller = require('../models/Seller');
router.get('/admin/seller-registrations', protect, admin, async (req, res) => {
  const { status = 'pending' } = req.query;
  const registrations = await Seller.find({ approvalStatus: status }).populate('user', 'username email');
  res.json(registrations);
});

router.patch('/admin/seller-registrations/:id/approve', protect, admin, approveVendor);
router.patch('/admin/seller-registrations/:id/reject', protect, admin, approveVendor);

module.exports = router;
