const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { keyword, category, crop, featured, page = 1, limit = 20, min_price, max_price } = req.query;
    
    const query = { status: 'approved' };
    
    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }
    
    if (category) {
      // Support both display name and slug-like matching
      const categoryRegex = category.replace(/-/g, '.*');
      query.category = { $regex: categoryRegex, $options: 'i' };
    }
    
    if (crop && crop !== 'Tất cả') {
      query.crops = { $in: [new RegExp(`^${crop}$`, 'i')] };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (min_price || max_price) {
      query.price = {};
      if (min_price) query.price.$gte = Number(min_price);
      if (max_price) query.price.$lte = Number(max_price);
    }

    const { sort } = req.query;
    let sortOptions = { isFeatured: -1, createdAt: -1 };
    if (sort === 'latest') sortOptions = { createdAt: -1 };
    if (sort === 'price-asc') sortOptions = { price: 1 };
    if (sort === 'price-desc') sortOptions = { price: -1 };
    if (sort === 'bestseller') sortOptions = { soldCount: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    // Get products and populate seller
    let products = await Product.find(query)
      .populate('seller', 'role vendorInfo')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // Permissive filtering: Show if seller is admin, or if seller is approved
    // In a real marketplace, we'd do this in the DB query with $lookup, 
    // but keeping it simple and fixing the current logic.
    const filteredProducts = products.filter(product => {
      if (!product.seller) return true; 
      const seller = product.seller;
      if (seller.role === 'admin') return true;
      // For vendors, check if they are approved and not expired
      if (seller.vendorInfo) {
        return seller.vendorInfo.isApproved && new Date(seller.vendorInfo.trialExpiresAt) > new Date();
      }
      return false;
    });

    const total = await Product.countDocuments(query);

    console.log(`[DEBUG] Found ${filteredProducts.length}/${total} products for query: ${JSON.stringify(query)}`);

    res.json({
      products: filteredProducts,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total: total
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
    const { name, slug } = req.body;
    
    // Auto-generate slug if not provided
    const productSlug = slug || name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

    const productData = { ...req.body };
    // Sync aliases
    if (productData.crops) productData.crop_types = productData.crops;
    if (productData.crop_types && !productData.crops) productData.crops = productData.crop_types;
    
    if (productData.soldCount) productData.sales_count = productData.soldCount;
    if (productData.sales_count && !productData.soldCount) productData.soldCount = productData.sales_count;

    if (productData.originalPrice) productData.original_price = productData.originalPrice;
    if (productData.original_price && !productData.originalPrice) productData.originalPrice = productData.original_price;

    if (productData.isFeatured !== undefined) productData.is_featured = productData.isFeatured;
    if (productData.is_featured !== undefined && productData.isFeatured === undefined) productData.isFeatured = productData.is_featured;

    if (productData.seoTitle) productData.seo_title = productData.seoTitle;
    if (productData.seo_title && !productData.seoTitle) productData.seoTitle = productData.seo_title;

    if (productData.seoDescription) productData.seo_desc = productData.seoDescription;
    if (productData.seo_desc && !productData.seoDescription) productData.seoDescription = productData.seo_desc;

    const product = new Product({
      ...productData,
      slug: productSlug,
      seller: req.user._id,
      seller_id: req.user._id,
      // Map statuses for convenience
      status: req.user.role === 'admin' ? 'approved' : 'pending_review'
    });
    // Final mapping for status if provided in audit format
    if (productData.status === 'published') product.status = 'approved';
    if (productData.status === 'draft') product.status = 'pending_review';
    if (productData.status === 'archived') product.status = 'hidden';

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

    const updateData = { ...req.body };
    // Sync aliases
    if (updateData.crops) updateData.crop_types = updateData.crops;
    if (updateData.crop_types && !updateData.crops) updateData.crops = updateData.crop_types;
    
    if (updateData.soldCount) updateData.sales_count = updateData.soldCount;
    if (updateData.sales_count && !updateData.soldCount) updateData.soldCount = updateData.sales_count;

    if (updateData.originalPrice) updateData.original_price = updateData.originalPrice;
    if (updateData.original_price && !updateData.originalPrice) updateData.originalPrice = updateData.original_price;

    if (updateData.isFeatured !== undefined) updateData.is_featured = updateData.isFeatured;
    if (updateData.is_featured !== undefined && updateData.isFeatured === undefined) updateData.isFeatured = updateData.is_featured;

    if (updateData.seoTitle) updateData.seo_title = updateData.seoTitle;
    if (updateData.seo_title && !updateData.seoTitle) updateData.seoTitle = updateData.seo_title;

    if (updateData.seoDescription) updateData.seo_desc = updateData.seoDescription;
    if (updateData.seo_desc && !updateData.seoDescription) updateData.seoDescription = updateData.seo_desc;

    if (updateData.seller) updateData.seller_id = updateData.seller;

    // Map audit statuses back to internal statuses
    if (updateData.status === 'published') updateData.status = 'approved';
    if (updateData.status === 'draft') updateData.status = 'pending_review';
    if (updateData.status === 'archived') updateData.status = 'hidden';

    // If seller updates a rejected or hidden product, reset it to pending_review
    if (req.user.role !== 'admin' && (product.status === 'rejected' || product.status === 'hidden' || product.status === 'archived')) {
      updateData.status = 'pending_review';
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
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
    const products = await Product.find({ status: 'pending_review' }).populate('seller', 'username vendorInfo').sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve/Reject product (Admin)
// @route   PUT /api/products/:id/approve
const approveProduct = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.status = status; // 'approved' or 'rejected'
      if (status === 'rejected') {
        product.rejectionReason = reason;
      } else {
        product.rejectionReason = '';
      }
      await product.save();
      res.json({ message: 'Trạng thái sản phẩm đã được cập nhật' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unique categories with counts
// @route   GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { name: "$_id", count: 1, _id: 0 } },
      { $sort: { name: 1 } }
    ]);
    res.json(categories);
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
  getCategories,
};
