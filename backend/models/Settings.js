const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  siteName: { type: String, default: 'Phân Bón Giá Tốt' },
  hotline: { type: String, default: '0339505050' },
  zalo: { type: String, default: '0339505050' },
  shopee: { type: String, default: 'phanbongiatot' },
  address: { type: String, default: 'Địa chỉ kho hàng của anh' },
  email: { type: String, default: 'contact@phanbongiatot.com' },
  facebook: { type: String, default: '' },
  freeShippingThreshold: { type: Number, default: 500000 },
  // Theme customization
  heroTitle: { type: String, default: 'Năng Suất Vượt Trội Chi Phí Tối Ưu' },
  heroSubtitle: { type: String, default: 'Hàng ngàn nhà nông đã tin dùng bộ giải pháp của chúng tôi.' },
  heroCtaUrl: { type: String, default: '/san-pham' },
  heroBanner: { type: String, default: '' },
  primaryColor: { type: String, default: '#1a5c2a' },
  showBlogOnHome: { type: Boolean, default: true },
  // Seller CTA Block
  sellerCtaTitle: { type: String, default: 'Trở thành Đối tác bán hàng' },
  sellerCtaDescription: { type: String, default: 'Hãy đăng ký mở gian hàng để tiếp cận hàng ngàn nhà nông trên khắp cả nước.' },
  sellerCtaButtonText: { type: String, default: 'ĐĂNG KÝ HỢP TÁC NGAY' },
  // Additional fields
  phone: { type: String, default: '0339.505.050' },
  zaloId: { type: String, default: '0339505050' },
  ctaText: { type: String, default: 'Nhận Tư Vấn Miễn Phí' },
  businessHours: { type: String, default: '7:00 - 21:00' },
  announcementEnabled: { type: Boolean, default: false },
  announcementText: { type: String, default: '' },
  footerAddress: { type: String, default: '' },
  footerEmail: { type: String, default: '' },
  defaultSeoTitle: { type: String, default: 'Phân Bón Giá Tốt - Giải Pháp Nông Nghiệp Xanh' },
  defaultSeoDescription: { type: String, default: 'Chuyên cung cấp phân bón, thuốc trừ sâu, kích rễ chất lượng cao cho bà con nông dân.' },
  defaultSeoImage: { type: String, default: '' },
  brands: { type: String, default: 'BÌNH ĐIỀN, ĐẠM PHÚ MỸ, PHÂN BÓN MIỀN NAM, YARA, HAIFA GROUP, BEHN MEYER, DAP ĐÌNH VŨ, ACTI AGRI' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
