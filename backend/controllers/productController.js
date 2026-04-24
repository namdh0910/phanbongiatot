const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
      
    const category = req.query.category 
      ? { category: req.query.category }
      : {};

    const products = await Product.find({ ...keyword, ...category, status: 'approved' })
      .populate('seller', 'role vendorInfo')
      .sort({ createdAt: -1 });

    // Lọc chỉ lấy sản phẩm của shop đã duyệt và còn hạn, hoặc của Admin
    const filteredProducts = products.filter(product => {
      const seller = product.seller;
      if (!seller) return false;
      
      // Admin products are always shown
      if (seller.role === 'admin') return true;

      if (!seller.vendorInfo) return false;
      
      const isApproved = seller.vendorInfo.isApproved;
      const trialExpiresAt = new Date(seller.vendorInfo.trialExpiresAt);
      const isNotExpired = trialExpiresAt > new Date();
      
      return isApproved && isNotExpired;
    });

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch products for a specific vendor
// @route   GET /api/products/vendor/me
const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'username vendorInfo');
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('seller', 'username vendorInfo');
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      seller: req.user._id,
      // Admin products are auto-approved, others are pending
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Only admin or the seller can update
    if (req.user.role !== 'admin' && product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // Only admin or the seller can delete
      if (req.user.role !== 'admin' && product.seller.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this product' });
      }
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Public
const createProductReview = async (req, res) => {
  try {
    const { rating, comment, name } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const review = {
        name: name || 'Khách hàng',
        rating: Number(rating),
        comment,
        createdAt: new Date(),
        status: 'approved',
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Đã thêm đánh giá' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all pending products (Admin)
// @route   GET /api/products/admin/pending
const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'pending' }).populate('seller', 'username vendorInfo').sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve/Reject product (Admin)
// @route   PUT /api/products/:id/approve
const approveProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.status = req.body.status; // 'approved' or 'rejected'
      await product.save();
      res.json({ message: 'Trạng thái sản phẩm đã được cập nhật' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getVendorProducts,
  getPendingProducts,
  approveProduct,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
