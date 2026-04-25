const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Today Stats
    const todayOrders = await Order.find({ createdAt: { $gte: today } });
    const todayRevenue = todayOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    const shippingOrders = await Order.countDocuments({ orderStatus: 'shipping' });
    const returnedOrders = await Order.countDocuments({ orderStatus: 'cancelled' }); // Giả sử cancelled là hoàn

    // 2. Product Stats
    const topProducts = await Product.find({ sold: { $gt: 0 } })
      .sort({ sold: -1 })
      .limit(10);
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } });

    // 3. Seller Stats
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const unconfirmedOrdersCount = await Order.countDocuments({ 
      orderStatus: 'new', 
      createdAt: { $lt: twoHoursAgo } 
    });

    // 4. Geography Stats (Revenue by Province)
    const geoStats = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: '$customerInfo.province',
          revenue: { $sum: '$totalPrice' },
          count: { $sum: 1 }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      today: {
        newOrders: todayOrders.length,
        revenue: todayRevenue,
        shipping: shippingOrders,
        returned: returnedOrders
      },
      products: {
        top: topProducts,
        lowStock: lowStockProducts
      },
      sellers: {
        unconfirmedLong: unconfirmedOrdersCount
      },
      geography: geoStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
