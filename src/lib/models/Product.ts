import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String },
  short_desc: { type: String },
  category: { type: String },
  category_id: { type: String },
  images: [{ type: String }],
  tags: [{ type: String }],
  stock: { type: Number, default: 99 },
  soldCount: { type: Number, default: 0 },
  isHot: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['pending_review', 'approved', 'published', 'active', 'rejected', 'hidden', 'draft', 'archived'],
    default: 'approved' 
  },
  approval_status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'approved' 
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'products' // Explicitly set collection name
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
