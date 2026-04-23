const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  images: [{ type: String }],
  isApproved: { type: Boolean, default: true }, // Set to true by default for now, can be changed to false for moderation later
}, {
  timestamps: true,
});

module.exports = mongoose.model('Review', reviewSchema);
