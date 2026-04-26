const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // URL for featured image
  tags: [String],
  author: { type: String, default: 'Kỹ sư Phân bón' },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String },
  category: { type: String }, // e.g. 'Kỹ thuật canh tác', 'Phân bón'
  crops: [String], // e.g. ['Sầu riêng', 'Cà phê']
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  viewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
