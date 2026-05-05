import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String },
  images: [{ type: String }],
  icon: { type: String },
  tags: [{ type: String }],
  isHot: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  stock: { type: Number, default: 99 },
  soldCount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 },
  features: [{ type: String }],
  usage: { type: String },
  benefits: [{ type: String }],
  category: { type: String },
  sku: { type: String },
  specifications: { type: Map, of: String }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
