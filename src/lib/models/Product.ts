import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: String },
  description: { type: String },
  image: { type: String },
  icon: { type: String },
  tags: [{ type: String }],
  isHot: { type: Boolean, default: false },
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
