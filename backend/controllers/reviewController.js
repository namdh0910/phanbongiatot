const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, isApproved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { product, name, rating, comment, images } = req.body;
    
    const review = await Review.create({
      product,
      name,
      rating,
      comment,
      images,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews/all
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('product', 'name').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review (Admin)
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.deleteOne();
      res.json({ message: 'Đã xóa đánh giá' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProductReviews, createReview, getAllReviews, deleteReview };
