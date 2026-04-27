const User = require('../models/User');
const Seller = require('../models/Seller');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get seller dashboard summary
// @route   GET /api/seller/dashboard
// @access  Private/Vendor
const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const [pendingOrders, confirmedOrders, totalProducts, products] = await Promise.all([
      Order.countDocuments({ seller: sellerId, orderStatus: 'new' }),
      Order.countDocuments({ seller: sellerId, orderStatus: 'confirmed' }),
      Product.countDocuments({ seller: sellerId }),
      Product.find({ seller: sellerId, stock: { $lt: 10 } }).select('name stock')
    ]);

    // Simple revenue today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayOrders = await Order.find({ 
      seller: sellerId, 
      orderStatus: { $ne: 'cancelled' },
      createdAt: { $gte: startOfToday }
    });
    const revenue_today = todayOrders.reduce((acc, o) => acc + o.totalPrice, 0);

    res.json({
      pending_orders: pendingOrders,
      confirmed_orders: confirmedOrders,
      total_products: totalProducts,
      revenue_today,
      low_stock_alerts: products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get seller revenue analytics
// @route   GET /api/seller/revenue
// @access  Private/Vendor
const getSellerRevenue = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { period = 'month', from, to } = req.query;

    let query = { seller: sellerId, orderStatus: 'done' };
    if (from && to) {
      query.createdAt = { $gte: new Date(from), $lte: new Date(to) };
    }

    const orders = await Order.find(query);
    const gross_revenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);
    
    const seller = await Seller.findOne({ user: sellerId });
    const commission_rate = seller ? seller.commissionRate : 5.0;
    const platform_commission = (gross_revenue * commission_rate) / 100;
    const net_revenue = gross_revenue - platform_commission;

    res.json({
      gross_revenue,
      platform_commission,
      net_revenue,
      commission_rate,
      orders_count: orders.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get public shop info by slug
// @route   GET /api/shops/:slug
// @access  Public
const getPublicShop = async (req, res) => {
  try {
    const seller = await Seller.findOne({ slug: req.params.slug })
      .select('storeName logo banner description stats createdAt')
      .populate('user', 'username createdAt');

    if (!seller) {
      return res.status(404).json({ message: 'Không tìm thấy shop' });
    }

    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get public shop products
// @route   GET /api/shops/:slug/products
// @access  Public
const getPublicShopProducts = async (req, res) => {
  try {
    const seller = await Seller.findOne({ slug: req.params.slug });
    if (!seller) return res.status(404).json({ message: 'Không tìm thấy shop' });

    const { category, sort, page = 1, limit = 12 } = req.query;
    const query = { seller: seller.user, status: 'approved' };
    if (category) query.category_id = category;

    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      data: products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSellerDashboard,
  getSellerRevenue,
  getPublicShop,
  getPublicShopProducts
};
