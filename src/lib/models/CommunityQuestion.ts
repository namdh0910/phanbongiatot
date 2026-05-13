import mongoose, { Schema, model, models } from 'mongoose';

export interface IAnswer {
  content: string;
  author: string;
  authorRole?: 'admin' | 'expert' | 'user';
  createdAt: Date;
}

export interface IQuestion {
  title: string;
  content: string;
  author: string;
  authorPhone?: string;
  category: string;
  status: 'pending' | 'approved' | 'hidden';
  answers: IAnswer[];
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const answerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  author: { type: String, required: true },
  authorRole: { type: String, enum: ['admin', 'expert', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  authorPhone: { type: String },
  category: { type: String, required: true, default: 'Chung' },
  status: { type: String, enum: ['pending', 'approved', 'hidden'], default: 'pending' },
  answers: [answerSchema],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
}, { timestamps: true });

// Indexes for performance
questionSchema.index({ status: 1, createdAt: -1 });
questionSchema.index({ category: 1 });

const CommunityQuestion = models.CommunityQuestion || model<IQuestion>('CommunityQuestion', questionSchema);

export default CommunityQuestion;
