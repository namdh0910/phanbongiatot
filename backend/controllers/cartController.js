const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get cart by sessionId
// @route   GET /api/cart
const getCart = async (req, res) => {
  try {
    const sessionId = req.headers['x-cart-session'] || req.cookies?.cart_session;
    if (!sessionId) return res.json({ items: [] });

    let cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Sync/Update cart
// @route   POST /api/cart/sync
const syncCart = async (req, res) => {
  try {
    const { sessionId, items, phone } = req.body;
    
    if (!sessionId) return res.status(400).json({ message: 'Session ID required' });

    let cart = await Cart.findOne({ sessionId });

    if (cart) {
      cart.items = items;
      if (phone) cart.phone = phone;
      cart.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await cart.save();
    } else {
      cart = await Cart.create({
        sessionId,
        items,
        phone
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Merge cart by phone
// @route   POST /api/cart/merge
const mergeCart = async (req, res) => {
  try {
    const { sessionId, phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'Phone required' });

    // Find any existing cart for this phone
    const phoneCart = await Cart.findOne({ phone }).sort({ updatedAt: -1 });
    const sessionCart = await Cart.findOne({ sessionId });

    if (phoneCart && sessionCart && phoneCart.sessionId !== sessionCart.sessionId) {
      // Merge items (prevent duplicates)
      const mergedItems = [...sessionCart.items];
      phoneCart.items.forEach(pItem => {
        const exists = mergedItems.find(sItem => sItem.product.toString() === pItem.product.toString());
        if (!exists) mergedItems.push(pItem);
      });

      sessionCart.items = mergedItems;
      sessionCart.phone = phone;
      await sessionCart.save();
      
      // Delete the old phone cart
      await Cart.findByIdAndDelete(phoneCart._id);
      
      return res.json(sessionCart);
    }

    if (sessionCart) {
      sessionCart.phone = phone;
      await sessionCart.save();
      return res.json(sessionCart);
    }

    res.json(phoneCart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  syncCart,
  mergeCart
};
