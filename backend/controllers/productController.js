const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { keyword, category, crop, page = 1, limit = 20 } = req.query;
    
    const query = { status: 'approved' };
    
    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }
    
    if (category) {
      // Support both name and slug if we want, but for now exact name (case-insensitive)
      query.category = { $regex: `^${category}$`, $options: 'i' };
    }
    
    if (crop && crop !== 'Tất cả') {
      query.crops = { $in: [new RegExp(`^${crop}$`, 'i')] };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .populate('seller', 'role vendorInfo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    console.log(`[DEBUG] Found ${products.length}/${total} products for query: ${JSON.stringify(query)}`);

    // Permissive filtering: Show if admin, or if seller is approved/not expired
    const filteredProducts = products.filter(product => {
      if (!product.seller) return true;
      const seller = product.seller;
      if (seller.role === 'admin') return true;
      if (!seller.vendorInfo) return false;
      const isApproved = seller.vendorInfo.isApproved;
      const trialExpiresAt = new Date(seller.vendorInfo.trialExpiresAt);
      return isApproved && trialExpiresAt > new Date();
    });

    res.json({
      products: filteredProducts,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
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
// @route   DELETE /api/products/:id
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

// @desc    Bulk delete products (Admin only)
// @route   POST /api/products/bulk-delete
const bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách ID không hợp lệ' });
    }
    
    // For extra safety, admin only for now via route middleware, 
    // but we check role here too
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Chỉ Admin mới có quyền xóa hàng loạt' });
    }

    await Product.deleteMany({ _id: { $in: ids } });
    res.json({ message: `Đã xóa thành công ${ids.length} sản phẩm` });
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

// @desc    Get all products (Admin)
// @route   GET /api/products/admin/all
const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('seller', 'username vendorInfo role').sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  getAdminProducts,
  getPendingProducts,
  approveProduct,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  createProductReview,
};
