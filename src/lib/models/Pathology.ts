import mongoose from 'mongoose';

const PathologySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  painPoint: { type: String },
  cause: { type: String },
  biologicalSolution: { type: String },
  symptoms: [{ type: String }],
  steps: [{
    name: String,
    time: String,
    description: String,
    product: String
  }],
  wrongActions: [{ type: String }],
  stats: {
    successVouchers: String,
    recoveryTime: String
  },
  testimonials: [{
    name: String,
    location: String,
    quote: String
  }],
  videoId: { type: String }
}, {
  timestamps: true
});

export default mongoose.models.Pathology || mongoose.model('Pathology', PathologySchema);
