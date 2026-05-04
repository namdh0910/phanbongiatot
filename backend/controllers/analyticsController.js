const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);

    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    lastMonth.setHours(0, 0, 0, 0);

    // 1. Today Stats
    const todayOrders = await Order.find({ createdAt: { $gte: today }, orderStatus: { $ne: 'cancelled' } });
    const todayRevenue = todayOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
    const shippingOrders = await Order.countDocuments({ orderStatus: 'shipping' });
    const returnedOrders = await Order.countDocuments({ orderStatus: 'cancelled' });

    // 2. Week/Month Stats
    const weekOrders = await Order.find({ createdAt: { $gte: lastWeek }, orderStatus: { $ne: 'cancelled' } });
    const weekRevenue = weekOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    const monthOrders = await Order.find({ createdAt: { $gte: lastMonth }, orderStatus: { $ne: 'cancelled' } });
    const monthRevenue = monthOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    // 3. Product Stats
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } }).limit(10);
    const topProducts = await Product.find({})
      .sort({ soldCount: -1 })
      .limit(10);

    // 4. Revenue Chart (30 days)
    const revenueChart = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      
      const nextD = new Date(d);
      nextD.setDate(nextD.getDate() + 1);

      const dayOrders = await Order.find({ 
        createdAt: { $gte: d, $lt: nextD }, 
        orderStatus: { $ne: 'cancelled' } 
      });
      const dayRevenue = dayOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
      revenueChart.push(Math.round(dayRevenue / 1000000)); // Triệu đồng
    }

    // 5. Notifications
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const unconfirmedLong = await Order.countDocuments({ 
      orderStatus: 'new', 
      createdAt: { $lt: twoHoursAgo } 
    });

    res.json({
      today: {
        newOrders: todayOrders.length,
        revenue: todayRevenue,
        shipping: shippingOrders,
        returned: returnedOrders
      },
      week: {
        newOrders: weekOrders.length,
        revenue: weekRevenue
      },
      month: {
        newOrders: monthOrders.length,
        revenue: monthRevenue
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts,
        top: topProducts
      },
      notifications: {
        unconfirmedLong
      },
      revenueChart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
