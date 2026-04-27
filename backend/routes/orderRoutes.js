const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderByIdOrCode,
  getOrdersByPhone,
  updateOrderStatus,
  getOrders,
  getVendorOrders,
  trackOrder,
  confirmSubOrder,
  shipSubOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createOrder).get(protect, getOrders);
router.get('/track', trackOrder);
router.route('/vendor/me').get(protect, getVendorOrders);
router.route('/phone/:phone').get(getOrdersByPhone);
router.route('/:idOrCode').get(getOrderByIdOrCode);
router.route('/:id/status').put(protect, updateOrderStatus);

// Seller sub-order actions
router.patch('/seller/sub-orders/:id/confirm', protect, confirmSubOrder);
router.patch('/seller/sub-orders/:id/ship', protect, shipSubOrder);
router.get('/seller/sub-orders', protect, getVendorOrders);

module.exports = router;
