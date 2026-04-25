const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create a review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { product, rating, comment, name, province, images } = req.body;
    
    const review = new Review({
      product,
      rating: Number(rating),
      comment,
      name,
      province,
      images,
      user: req.user?._id, // Optional if logged in
      status: 'pending_review'
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
const getProductReviews = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { product: req.params.productId };
    if (status) query.status = status;
    
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
// @route   PUT /api/reviews/:id/status
const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findById(req.params.id);
    
    if (review) {
      review.status = status;
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
