import mongoose, { Schema, model, models } from 'mongoose';

export interface IAnalytics {
  type: 'page_view' | 'zalo_click' | 'call_click' | 'lead_submit' | 'ViewPopup';
  path: string; // Trang xảy ra sự kiện
  metadata?: any; // Thông tin thêm (ví dụ: tên sản phẩm nếu là click từ trang sp)
  sessionId?: string;
  ip?: string;
}

const analyticsSchema = new Schema<IAnalytics>({
  type: { 
    type: String, 
    required: true,
    enum: ['page_view', 'zalo_click', 'call_click', 'lead_submit', 'ViewPopup']
  },
  path: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  sessionId: { type: String },
  ip: { type: String },
}, { timestamps: true });

// Index để truy vấn nhanh theo thời gian và loại sự kiện
analyticsSchema.index({ type: 1, createdAt: -1 });

const Analytics = models.Analytics || model<IAnalytics>('Analytics', analyticsSchema);

export default Analytics;
