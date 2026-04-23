import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
export async function getSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) throw new Error('Settings fetch failed');
    return await res.json();
  } catch (error) {
    return {
      siteName: 'Phân Bón Giá Tốt',
      hotline: '0773440966',
      zalo: '0773440966',
      shopee: 'phanbongiatot',
      address: 'Trụ sở: 123 Đường Nông Nghiệp, Quận 12, TP. Hồ Chí Minh',
      email: 'hotro@phanbongiatot.com',
      heroTitle: 'Năng Suất Vượt Trội Chi Phí Tối Ưu',
      heroSubtitle: 'Hàng ngàn nhà nông đã tin dùng bộ giải pháp phục hồi rễ, đặc trị tuyến trùng và vàng lá thối rễ của chúng tôi. Cam kết hiệu quả rõ rệt sau 7 ngày!',
      heroBanner: '',
      primaryColor: '#0d2a1c',
      showBlogOnHome: true,
      phone: '0773.440.966',
      zaloId: '0773440966',
      ctaText: 'Nhận Tư Vấn Miễn Phí',
      businessHours: '7:00 - 21:00',
      announcementEnabled: false,
      announcementText: '',
      footerAddress: '',
      footerEmail: ''
    };
  }
}
