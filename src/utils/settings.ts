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
      hotline: '0339505050',
      zalo: '0339505050',
      shopee: 'phanbongiatot',
      address: 'Kho hàng: Phường Đăk Cấm, TP. Kon Tum, Tỉnh Kon Tum',
      email: 'contact@phanbongiatot.com',
      heroTitle: 'Năng Suất Vượt Trội Chi Phí Tối Ưu',
      heroSubtitle: 'Hàng ngàn nhà nông đã tin dùng bộ giải pháp phục hồi rễ, đặc trị tuyến trùng và vàng lá thối rễ của chúng tôi. Cam kết hiệu quả rõ rệt sau 7 ngày!',
      heroBanner: '',
      primaryColor: '#0d2a1c',
      showBlogOnHome: true,
      phone: '0339505050',
      zaloId: '0339505050',
      ctaText: 'Nhận Tư Vấn Miễn Phí',
      businessHours: '7:00 - 21:00',
      announcementEnabled: false,
      announcementText: '',
      footerAddress: 'Kho hàng: Phường Đăk Cấm, TP. Kon Tum, Tỉnh Kon Tum',
      footerEmail: 'contact@phanbongiatot.com'
    };
  }
}
