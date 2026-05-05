import mongoose, { Schema, model, models } from 'mongoose';

export interface ILead {
  name: string;
  phone: string;
  cropType: string;
  pathology: string; // Tình trạng bệnh
  note?: string;
  source: string;
  imageUrl?: string;
  isContacted: boolean;
  status: 'pending' | 'called' | 'consulted' | 'cancelled';
}

const leadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  cropType: { type: String }, // Sầu riêng, Cà phê...
  pathology: { type: String }, // Vàng lá, Thối rễ...
  note: { type: String },
  source: { type: String, default: 'website_lead_form' },
  imageUrl: { type: String },
  isContacted: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['pending', 'called', 'consulted', 'cancelled'], 
    default: 'pending' 
  },
}, { timestamps: true });

const Lead = models.Lead || model<ILead>('Lead', leadSchema);

export default Lead;
