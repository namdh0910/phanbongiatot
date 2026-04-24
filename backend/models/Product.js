const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: ['Phân bón', 'Thuốc trừ sâu', 'Kích rễ', 'Tuyến trùng'] },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    usageInstructions: { type: String },
    dosage: { type: String },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    faq: [{ q: String, a: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    rating: { type: Number, default: 5 },
    numReviews: { type: Number, default: 0 },
    reviews: [{
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      status: { type: String, default: 'approved' }
    }]
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
