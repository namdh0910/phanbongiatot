const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderByIdOrCode,
  getOrdersByPhone,
  updateOrderStatus,
  getOrders,
  getVendorOrders,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createOrder).get(protect, getOrders);
router.route('/vendor/me').get(protect, getVendorOrders);
router.route('/phone/:phone').get(getOrdersByPhone);
router.route('/:idOrCode').get(getOrderByIdOrCode);
router.route('/:id/status').put(protect, updateOrderStatus);

module.exports = router;
