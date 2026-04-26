const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    reviewer_name: { type: String, required: true },
    reviewer_phone: { type: String, required: true },
    reviewer_province: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    approved_at: { type: Date },
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
