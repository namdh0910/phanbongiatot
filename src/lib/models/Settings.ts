import mongoose, { Schema, model, models } from 'mongoose';

export interface ISettings {
  siteName: string;
  hotline: string;
  zalo: string;
  announcementEnabled: boolean;
  announcementText: string;
  primaryColor: string;
  secondaryColor: string;
  address: string;
  email: string;
}

const settingsSchema = new Schema<ISettings>({
  siteName: { type: String, default: 'Phân Bón Giá Tốt' },
  hotline: { type: String, default: '0773.440.966' },
  zalo: { type: String, default: '0773440966' },
  announcementEnabled: { type: Boolean, default: false },
  announcementText: { type: String, default: 'Nhận giải pháp phục hồi vàng lá miễn phí' },
  primaryColor: { type: String, default: '#1a5c2a' }, // Leaf Green
  secondaryColor: { type: String, default: '#f5a623' }, // Earth Brown/Orange
  address: { type: String, default: 'Kho hàng Tây Nguyên' },
  email: { type: String, default: 'contact@phanbongiatot.com' },
}, { timestamps: true });

const Settings = models.Settings || model<ISettings>('Settings', settingsSchema);

export default Settings;
