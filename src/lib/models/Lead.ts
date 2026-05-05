import mongoose, { Schema, model, models } from 'mongoose';

export interface ILead {
  name: string;
  phone: string;
  city?: string;
  cropType: string;
  symptoms?: string;
  pathology?: string; // Tình trạng bệnh (backward compatibility)
  urgency?: 'low' | 'medium' | 'high';
  note?: string;
  source: string;
  imageUrl?: string;
  isContacted: boolean;
  status: 'pending' | 'called' | 'consulted' | 'cancelled';
}

const leadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  phone: { 
    type: String, 
    required: true,
    match: [/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ']
  },
  city: { type: String },
  cropType: { type: String }, // Sầu riêng, Cà phê...
  symptoms: { type: String }, // Triệu chứng
  pathology: { type: String }, // Vàng lá, Thối rễ...
  urgency: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
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
