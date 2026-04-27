const Product = require('../models/Product');
const { triggerRevalidate } = require('../utils/revalidate');

// @desc    Get all products for frontend
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { 
      category, 
      crop_type, 
      price_range, 
      sort, 
      page = 1, 
      limit = 12, 
      seller_id, 
      featured,
      status: queryStatus,
      approval_status: queryApprovalStatus
    } = req.query;

    const query = {};

    // Mandatory filters for public view (unless admin/seller specific query is allowed)
    // If we want to allow admin to see draft products via this endpoint, we'd check roles.
    // But audit says BẮT BUỘC filter for frontend.
    // Mandatory filters for public view
    query.status = { $in: ['approved', 'published', 'active'] };
    if (queryStatus) query.status = queryStatus;

    query.approval_status = queryApprovalStatus || 'approved';
    
    // stock > 0 filter
    query.stock = { $gt: 0 };

    if (category) {
      // Support slug-based matching
      query.category_id = category;
    }

    if (crop_type) {
      query.crop_types = { $in: [crop_type] };
    }

    if (seller_id) {
      query.seller_id = seller_id;
    }

    if (featured === 'true') {
      query.$or = [
        { is_featured: true },
        { isFeatured: true }
      ];
    }

    // Price range mapping: 1=<100k, 2=100k-500k, 3=>500k
    if (price_range) {
      if (price_range === '1') query.price = { $lt: 100000 };
      else if (price_range === '2') query.price = { $gte: 100000, $lte: 500000 };
      else if (price_range === '3') query.price = { $gt: 500000 };
    }

    console.log('Final Products Query:', JSON.stringify(query, null, 2));

    // Sort mapping
    let sortOptions = { is_featured: -1, created_at: -1 };
    if (sort === 'latest') sortOptions = { created_at: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'sales_count_desc' || sort === 'sales') sortOptions = { sales_count: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('seller', 'username vendorInfo role')
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get crop types enum
// @route   GET /api/crop-types
const getCropTypes = async (req, res) => {
  // Returns unique crop_types from DB or a fixed list
  try {
    const cropTypes = await Product.distinct('crop_types', { status: 'approved' });
    res.json(cropTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product stock (Atomic)
// @route   PATCH /api/admin/products/:id/stock
const updateStock = async (req, res) => {
  try {
    const { delta } = req.body; // e.g. +5 or -3
    if (isNaN(delta)) return res.status(400).json({ message: 'Delta must be a number' });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { stock: Number(delta) } },
      { new: true }
    );

    if (product) {
       // Also update inStock status
       product.inStock = product.stock > 0;
       await product.save();
       res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve/Reject/Suspend product (Admin)
// @route   PATCH /api/admin/products/:id/approve
const approveProduct = async (req, res) => {
  try {
    const { action, reason } = req.body; // 'approve', 'reject', 'suspend'
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    if (action === 'approve') {
      product.approval_status = 'approved';
      product.status = 'published';
      product.reviewed_by = req.user._id;
      product.reviewed_at = new Date();
    } else if (action === 'reject') {
      product.approval_status = 'rejected';
      product.status = 'draft';
      product.reject_reason = reason || 'Nội dung không đạt tiêu chuẩn';
      product.reviewed_by = req.user._id;
      product.reviewed_at = new Date();
    } else if (action === 'suspend') {
      product.approval_status = 'suspended';
      product.status = 'archived';
      product.suspended_reason = reason;
    }

    await product.save();

    if (action === 'approve' || action === 'suspend') {
      triggerRevalidate(['/', `/san-pham/${product.slug}`, `/danh-muc/${product.category_id}`]);
    }

    res.json({ success: true, message: `Thực hiện ${action} thành công`, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending products for admin queue
const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ approval_status: 'pending' })
      .populate('seller', 'username vendorInfo')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... (rest of the controller functions remain, adjusted for field names if needed)

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'username vendorInfo');
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('seller', 'username vendorInfo');
    if (product) {
      product.view_count = (product.view_count || 0) + 1;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const productSlug = slug || name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

    const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');

    const productData = { ...req.body };
    if (productData.crops) productData.crop_types = productData.crops.map(c => slugify(c));
    
    const product = new Product({
      ...productData,
      slug: productSlug,
      seller: req.user._id,
      seller_id: req.user._id,
      approval_status: req.user.role === 'admin' ? 'approved' : 'pending',
      status: req.user.role === 'admin' ? 'approved' : 'pending_review'
    });

    const createdProduct = await product.save();
    
    if (createdProduct.status === 'approved') {
      triggerRevalidate(['/', `/danh-muc/${createdProduct.category_id}`]);
    }

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = req.resource; // Loaded from checkOwnership middleware
    
    const updateData = { ...req.body };
    
    // Logic: If non-admin edits sensitive fields, reset approval status
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin';
    const sensitiveFieldsChanged = updateData.price || updateData.images || updateData.name;
    
    if (!isAdmin && sensitiveFieldsChanged) {
      updateData.approval_status = 'pending';
      updateData.status = 'draft';
    }

    const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-');
    if (updateData.crops) updateData.crop_types = updateData.crops.map(c => slugify(c));

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (updatedProduct.status === 'approved') {
      triggerRevalidate(['/', `/san-pham/${updatedProduct.slug}`, `/danh-muc/${updatedProduct.category_id}`]);
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const isAuthorized = req.user.role === 'admin' || req.user.role === 'super_admin' || product.seller.toString() === req.user._id.toString();
    
    if (!isAuthorized) {
       return res.status(403).json({ message: 'Bạn không có quyền xóa sản phẩm này' });
    }
    await Product.findByIdAndDelete(req.params.id);
    
    // Revalidate on delete
    triggerRevalidate(['/', `/danh-muc/${product.category_id}`]);

    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bulkDeleteProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    await Product.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Products removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProductReview = async (req, res) => {
    // Basic review implementation
    try {
        const { rating, comment, name } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            const review = { name: name || req.user.username, rating: Number(rating), comment };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all categories with counts
// @route   GET /api/categories
const getCategories = async (req, res) => {
  try {
    const { include_count } = req.query;
    
    // Fixed categories for Phân Bón Giá Tốt
    const categories = [
      { name: 'Phân bón', slug: 'phan-bon' },
      { name: 'Thuốc trừ sâu', slug: 'thuoc-tru-sau' },
      { name: 'Kích rễ', slug: 'kich-re' },
      { name: 'Tuyến trùng', slug: 'tuyen-trung' }
    ];

    if (include_count === 'true') {
      const counts = await Product.aggregate([
        { $match: { 
            status: { $in: ['approved', 'published', 'active'] },
            approval_status: 'approved',
            stock: { $gt: 0 }
        } },
        { $group: { _id: '$category_id', count: { $sum: 1 } } }
      ]);
      
      const categoriesWithCount = categories.map(cat => {
        const found = counts.find(c => c._id === cat.slug);
        return { ...cat, count: found ? found.count : 0 };
      });
      return res.json(categoriesWithCount);
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current seller's products
// @route   GET /api/seller/products
const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({ created_at: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products (Admin only)
// @route   GET /api/products/admin/all
const getAllAdminProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('seller', 'username vendorInfo role')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getCropTypes,
  getCategories,
  getVendorProducts,
  getAllAdminProducts,
  updateStock,
  approveProduct,
  getPendingProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  createProductReview
};
