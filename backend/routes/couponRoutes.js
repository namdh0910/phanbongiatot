const express = require('express');
const router = express.Router();
const { getCoupons, createCoupon, validateCoupon, deleteCoupon } = require('../controllers/couponController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCoupons).post(protect, createCoupon);
router.route('/validate').post(validateCoupon);
router.route('/:id').delete(protect, deleteCoupon);

module.exports = router;
