const Product = require('../models/Product');
const Blog = require('../models/Blog');

// @desc    Search products and blogs
// @route   GET /api/search
// @access  Public
const searchAll = async (req, res) => {
  try {
    const q = req.query.q || '';
    
    if (!q) {
      return res.json({ products: [], blogs: [] });
    }

    const searchRegex = new RegExp(q, 'i');

    // Search Products
    const products = await Product.find({
      status: 'approved',
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex }
      ]
    }).limit(20);

    // Search Blogs (Posts)
    const blogs = await Blog.find({
      status: 'published',
      $or: [
        { title: searchRegex },
        { content: searchRegex },
        { excerpt: searchRegex },
        { category: searchRegex }
      ]
    }).limit(10);

    res.json({
      products,
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  searchAll
};
