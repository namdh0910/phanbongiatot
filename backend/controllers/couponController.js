const Coupon = require('../models/Coupon');

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a coupon (Admin)
// @route   POST /api/coupons
const createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, expiryDate, maxUsage } = req.body;
    const couponExists = await Coupon.findOne({ code });

    if (couponExists) {
      return res.status(400).json({ message: 'Mã giảm giá đã tồn tại' });
    }

    const coupon = new Coupon({
      code,
      discountType,
      discountValue,
      minOrderAmount,
      expiryDate,
      maxUsage,
    });

    const createdCoupon = await coupon.save();
    res.status(201).json(createdCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Validate a coupon (Public)
// @route   POST /api/coupons/validate
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
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

    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({ 
        message: `Đơn hàng tối thiểu ${coupon.minOrderAmount.toLocaleString('vi-VN')}đ để sử dụng mã này` 
      });
    }

    res.json({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a coupon (Admin)
// @route   DELETE /api/coupons/:id
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      await coupon.deleteOne();
      res.json({ message: 'Đã xóa mã giảm giá' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCoupons,
  createCoupon,
  validateCoupon,
  deleteCoupon,
};
