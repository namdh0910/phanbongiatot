const Combo = require('../models/Combo');
const { triggerRevalidate } = require('../utils/revalidate');

// @desc    Get all combos
// @route   GET /api/combos
// @access  Public
const getCombos = async (req, res) => {
  try {
    const { is_featured, seller_id } = req.query;
    const query = { status: 'published' };
    
    if (is_featured === 'true') query.isFeatured = true;
    if (seller_id) query.seller = seller_id;

    let combos = await Combo.find(query).populate('items.product');
    
    // Filter out combos where any component is out of stock
    combos = combos.filter(combo => {
      return combo.items.every(item => item.product && item.product.stock >= item.quantity);
    });

    res.json(combos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create/Update combo (Admin)
// @route   POST /api/admin/combos
// @access  Private/Admin
const manageCombo = async (req, res) => {
  try {
    const { id, name, items, comboPrice, originalPrice, image, isFeatured, status } = req.body;
    
    const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
    const slug = slugify(name);

    let combo;
    if (id) {
      combo = await Combo.findByIdAndUpdate(id, {
        name, slug, items, comboPrice, originalPrice, image, isFeatured, status
      }, { new: true });
    } else {
      combo = new Combo({
        name, slug, items, comboPrice, originalPrice, image, isFeatured, status
      });
      await combo.save();
    }

    if (combo) {
      triggerRevalidate(['/', '/combo']);
    }

    res.json(combo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCombos,
  manageCombo
};
