import dbConnect from '../lib/db';
import SiteConfig from '../lib/models/SiteConfig';

const initialConfigs = [
  // HERO GROUP
  { key: 'hero_title', value: 'Giải Pháp Phục Hồi Cây Trồng Sinh Học', group: 'hero', label: 'Tiêu đề Hero', type: 'text' },
  { key: 'hero_subtitle', value: 'Hàng ngàn nhà nông đã thành công cứu vườn suy kiệt bằng giải pháp chuẩn kỹ thuật.', group: 'hero', label: 'Mô tả Hero', type: 'textarea' },
  { key: 'hero_cta_primary', value: 'Nhận Tư Vấn Miễn Phí', group: 'hero', label: 'Nút CTA chính', type: 'text' },
  
  // CONTACT GROUP
  { key: 'phone_primary', value: '0773.440.966', group: 'contact', label: 'Hotline chính', type: 'text' },
  { key: 'zalo_id', value: '0773440966', group: 'contact', label: 'Số Zalo', type: 'text' },
  { key: 'business_hours', value: '7:00 - 21:00', group: 'contact', label: 'Giờ làm việc', type: 'text' },
  
  // ANNOUNCEMENT GROUP
  { key: 'announcement_enabled', value: 'true', group: 'announcement', label: 'Bật thông báo', type: 'boolean' },
  { key: 'announcement_message', value: '🔥 Nhận giải pháp phục hồi vàng lá miễn phí', group: 'announcement', label: 'Nội dung thông báo', type: 'text' },
  { key: 'announcement_bg', value: '#f5a623', group: 'announcement', label: 'Màu nền thông báo', type: 'color' },
  
  // SEO GROUP
  { key: 'site_name', value: 'Phân Bón Giá Tốt', group: 'seo', label: 'Tên Website', type: 'text' },
  { key: 'default_description', value: 'Chuyên gia phục hồi cây trồng bằng giải pháp sinh học bền vững.', group: 'seo', label: 'Mô tả SEO mặc định', type: 'textarea' },
];

async function seed() {
  try {
    await dbConnect();
    console.log('Seeding SiteConfig...');
    
    for (const config of initialConfigs) {
      await SiteConfig.findOneAndUpdate(
        { key: config.key },
        { $set: config },
        { upsert: true }
      );
    }
    
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
