const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create a review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { product, rating, content, reviewer_name, reviewer_phone, reviewer_province, images, order_id } = req.body;
    
    if (!content || content.length < 20) {
      return res.status(400).json({ message: 'Nội dung đánh giá phải có ít nhất 20 ký tự.' });
    }

    const review = new Review({
      product,
      rating: Number(rating),
      content,
      reviewer_name,
      reviewer_phone,
      reviewer_province,
      images,
      order_id,
      status: 'pending'
    });

    const createdReview = await review.save();
    res.status(201).json({ message: 'Cảm ơn! Đánh giá sẽ hiển thị sau khi được duyệt (24h).', review: createdReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews
const getProductReviews = async (req, res) => {
  try {
    const { product_id, status = 'approved' } = req.query;
    const query = { status };
    if (product_id) query.product = product_id;
    
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews/admin/all
const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('product', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update review status (Admin)
// @route   PATCH /api/admin/reviews/:id
const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findById(req.params.id);
    
    if (review) {
      review.status = status;
      if (status === 'approved') {
        review.approved_at = new Date();
        review.approved_by = req.user._id;
      }
      await review.save();
      
      // If approved, update product aggregate rating
      if (status === 'approved') {
        const product = await Product.findById(review.product);
        if (product) {
          const productReviews = await Review.find({ product: review.product, status: 'approved' });
          product.numReviews = productReviews.length;
          product.rating = productReviews.reduce((acc, item) => item.rating + acc, 0) / productReviews.length;
          await product.save();
        }
      }
      
      res.json({ message: 'Trạng thái đánh giá đã được cập nhật' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getAdminReviews,
  updateReviewStatus
};
