import mongoose, { Schema, model, models } from 'mongoose';

export interface ISiteConfig {
  key: string;
  value: string;
  group: 'hero' | 'contact' | 'announcement' | 'seo' | 'general';
  label: string;
  type: 'text' | 'textarea' | 'boolean' | 'color';
}

const siteConfigSchema = new Schema<ISiteConfig>({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  group: { 
    type: String, 
    enum: ['hero', 'contact', 'announcement', 'seo', 'general'], 
    default: 'general' 
  },
  label: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['text', 'textarea', 'boolean', 'color'], 
    default: 'text' 
  },
}, { timestamps: true });

const SiteConfig = models.SiteConfig || model<ISiteConfig>('SiteConfig', siteConfigSchema);

export default SiteConfig;
