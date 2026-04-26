const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    category_id: { type: String }, // FK -> categories.slug
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    original_price: { type: Number }, // Alias
    description: { type: String, required: true }, // HTML rich text
    short_desc: { type: String }, // 1-2 lines for product card
    crops: [{ type: String }],
    crop_types: [{ type: String }], // Array enum slugs: ['sau-rieng', 'ca-phe', ...]
    benefits: [{ type: String }],
    specifications: { type: String },
    usage: { type: String },
    usageInstructions: { type: String },
    dosage: { type: String },
    images: [mongoose.Schema.Types.Mixed], // Supports both string URLs and {url, alt, order}
    tags: [{ type: String }],
    stock: { type: Number, default: 0 },
    weight_g: { type: Number, default: 500 },
    isFeatured: { type: Boolean, default: false },
    is_featured: { type: Boolean, default: false }, // Alias
    isNewArrival: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    faq: [{ q: String, a: String }],
    seoTitle: { type: String },
    seo_title: { type: String }, // Alias
    seoDescription: { type: String },
    seo_desc: { type: String }, // Alias
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
    sales_count: { type: Number, default: 0 }, // Alias
    view_count: { type: Number, default: 0 },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seller_id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    unit: { type: String, default: 'chai' },
    rejectionReason: { type: String },
    reject_reason: { type: String }, // Alias
    status: {
      type: String,
      enum: ['pending_review', 'approved', 'rejected', 'hidden', 'draft', 'published', 'archived'],
      default: 'pending_review'
    },
    approval_status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    variants: [{
      name: { type: String, required: true },
      price: { type: Number, required: true },
      originalPrice: { type: Number },
      stock: { type: Number, default: 0 },
      sku: { type: String }
    }],
    reviews: [{
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      status: { type: String, default: 'approved' }
    }]
  },
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for 'id' matching 'prod_abc123' style (mapping _id to id)
productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
