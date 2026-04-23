const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // URL for featured image
  tags: [String],
  author: { type: String, default: 'Kỹ sư Phân bón' },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
