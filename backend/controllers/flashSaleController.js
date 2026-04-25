const FlashSale = require('../models/FlashSale');
const Product = require('../models/Product');

// @desc    Get active flash sales
// @route   GET /api/flash-sales/active
const getActiveFlashSales = async (req, res) => {
  try {
    const now = new Date();
    const sales = await FlashSale.find({
      isActive: true,
      startAt: { $lte: now },
      endAt: { $gte: now }
    }).populate('product', 'name slug images price originalPrice');
    
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all flash sales (Admin)
// @route   GET /api/flash-sales
const getFlashSales = async (req, res) => {
  try {
    const sales = await FlashSale.find({})
      .populate('product', 'name price')
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create flash sale (Admin)
// @route   POST /api/flash-sales
const createFlashSale = async (req, res) => {
  try {
    const sale = new FlashSale(req.body);
    const createdSale = await sale.save();
    res.status(201).json(createdSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete flash sale (Admin)
// @route   DELETE /api/flash-sales/:id
const deleteFlashSale = async (req, res) => {
  try {
    const sale = await FlashSale.findByIdAndDelete(req.params.id);
    if (sale) res.json({ message: 'Đã xóa flash sale' });
    else res.status(404).json({ message: 'Không tìm thấy flash sale' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActiveFlashSales,
  getFlashSales,
  createFlashSale,
  deleteFlashSale
};
