const Coupon = require('../models/Coupon');

// @desc    Validate a coupon code
// @route   POST /api/coupons/validate
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    const cartTotal = orderAmount;
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: 'Mã giảm giá đã hết hạn' });
    }

    if (coupon.usageCount >= coupon.maxUsage) {
      return res.status(400).json({ message: 'Mã giảm giá đã hết lượt sử dụng' });
    }

    if (cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({ 
        message: `Đơn hàng tối thiểu ₫${coupon.minOrderAmount.toLocaleString()} để sử dụng mã này` 
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (cartTotal * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    res.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all coupons (Admin)
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a coupon (Admin)
const createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    const createdCoupon = await coupon.save();
    res.status(201).json(createdCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a coupon (Admin)
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (coupon) res.json({ message: 'Đã xóa mã giảm giá' });
    else res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateCoupon,
  getCoupons,
  createCoupon,
  deleteCoupon
};
