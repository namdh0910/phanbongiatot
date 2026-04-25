const { calculateShippingFee } = require('../utils/shipping');

// @desc    Calculate shipping fee
// @route   POST /api/shipping/calculate
const getShippingFee = async (req, res) => {
  try {
    const { province, items } = req.body;
    
    // Giả sử mỗi sản phẩm nặng 1kg (1000g)
    const totalWeight = items.reduce((acc, item) => acc + (item.quantity || 1) * 1000, 0);
    
    const fee = await calculateShippingFee(province, totalWeight);
    
    res.json({ fee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getShippingFee };
