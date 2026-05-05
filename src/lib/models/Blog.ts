import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: 'Nhật ký phục hồi vườn' | 'Mỗi chất - Một vấn đề' | 'Cẩm nang kỹ thuật';
  videoUrl?: string;
  coverImage: string;
  content: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Nhật ký phục hồi vườn', 'Mỗi chất - Một vấn đề', 'Cẩm nang kỹ thuật'],
    default: 'Cẩm nang kỹ thuật'
  },
  videoUrl: { type: String },
  coverImage: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

// Auto-generate slug from title if not provided or ensure it exists
BlogSchema.pre('validate', function(this: any, next) {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-").replace(/-+/g, "-");
  }
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
