"use client";
// Unified Footer Component for Phân Bón Giá Tốt
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import './HeaderFooter.css';

export default function Footer() {
  const pathname = usePathname();
  const settings = useSettings();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: Brand & Social */}
        <div className="space-y-8">
          <Link href="/" className="text-3xl font-black text-[#1a5c2a] tracking-tight">
            PhânBón<span className="text-[#f5a623]">GiáTốt</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Chuyên gia cung cấp giải pháp dinh dưỡng cây trồng hàng đầu Việt Nam. Chúng tôi đồng hành cùng nhà nông nâng tầm giá trị nông sản.
          </p>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Kết nối với chúng tôi</h4>
            <div className="footer-social-grid">
              <a href="https://facebook.com/phanbongiatot" target="_blank" className="social-icon-btn" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com/@phanbongiatot" target="_blank" className="social-icon-btn" title="Youtube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} target="_blank" className="social-icon-btn" title="Zalo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.047 11.233c.489.176.848.436.96.678.113.242.017.504-.263.754-.28.251-.73.491-1.285.694-1.109.406-2.825.617-4.708.617-1.883 0-3.599-.211-4.708-.617-.555-.203-1.005-.443-1.285-.694-.28-.25-.376-.512-.263-.754.112-.242.471-.502.96-.678.96-.345 2.378-.521 3.938-.521 1.56 0 2.978.176 3.938.521zM11.99 0C5.369 0 0 4.417 0 9.865c0 3.23 1.885 6.096 4.792 7.91l-.988 3.58c-.144.524.234 1.012.766.92l4.168-.718c1.025.215 2.115.334 3.252.334 6.622 0 11.99-4.417 11.99-9.865C23.98 4.417 18.613 0 11.99 0z"/></svg>
              </a>
              <a href="https://shopee.vn/phanbongiatot" target="_blank" className="social-icon-btn" title="Shopee">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.047 11.233c.489.176.848.436.96.678.113.242.017.504-.263.754-.28.251-.73.491-1.285.694-1.109.406-2.825.617-4.708.617-1.883 0-3.599-.211-4.708-.617-.555-.203-1.005-.443-1.285-.694-.28-.25-.376-.512-.263-.754.112-.242.471-.502.96-.678.96-.345 2.378-.521 3.938-.521 1.56 0 2.978.176 3.938.521z"/></svg>
              </a>
            </div>
          </div>
          <div className="pt-4">
            <img 
              src="/images/bo-cong-thuong.png" 
              alt="Đã thông báo bộ công thương" 
              className="footer-cert" 
              width="150"
              height="57"
            />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative">
            Sản phẩm chính
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#1a5c2a]"></span>
          </h4>
          <ul className="space-y-4 text-gray-400 text-sm font-medium">
            <li><Link href="/danh-muc/phan-bon" className="hover:text-[#1a5c2a] transition-colors">Phân bón sinh học</Link></li>
            <li><Link href="/danh-muc/phan-bon-la" className="hover:text-[#1a5c2a] transition-colors">Phân bón lá cao cấp</Link></li>
            <li><Link href="/danh-muc/kich-re" className="hover:text-[#1a5c2a] transition-colors">Siêu kích rễ cực mạnh</Link></li>
            <li><Link href="/danh-muc/tuyen-trung" className="hover:text-[#1a5c2a] transition-colors">Đặc trị tuyến trùng</Link></li>
            <li><Link href="/combo" className="hover:text-[#1a5c2a] transition-colors">Gói giải pháp tiết kiệm</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative">
            Hỗ trợ khách hàng
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#1a5c2a]"></span>
          </h4>
          <ul className="space-y-4 text-gray-400 text-sm font-medium">
            <li><Link href="/chinh-sach-van-chuyen" className="hover:text-[#1a5c2a] transition-colors">Chính sách vận chuyển</Link></li>
            <li><Link href="/chinh-sach-bao-hanh" className="hover:text-[#1a5c2a] transition-colors">Chính sách đổi trả</Link></li>
            <li><Link href="/tra-cuu-don-hang" className="hover:text-[#1a5c2a] transition-colors">Tra cứu đơn hàng</Link></li>
            <li><Link href="/huong-dan-mua-hang" className="hover:text-[#1a5c2a] transition-colors">Hướng dẫn mua hàng</Link></li>
            <li><Link href="/lien-he" className="hover:text-[#1a5c2a] transition-colors">Hỏi đáp kỹ thuật</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Map */}
        <div>
          <h4 className="text-lg font-bold mb-8 text-white relative">
            Thông tin liên hệ
            <span className="absolute -bottom-2 left-0 w-10 h-1 bg-[#1a5c2a]"></span>
          </h4>
          <div className="space-y-4 text-gray-400 text-sm">
            <div className="flex gap-3">
              <span className="text-[#1a5c2a] text-lg">📍</span>
              <p>{settings?.address || 'Kho hàng: TP. Buôn Ma Thuột, Tỉnh Đắk Lắk'}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1a5c2a] text-lg">📞</span>
              <div>
                <p className="font-black text-white text-base">{settings?.hotline || '0773.440.966'}</p>
                <p className="text-[10px] uppercase font-bold text-gray-500">Kỹ sư tư vấn 24/7</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1a5c2a] text-lg">✉️</span>
              <p>{settings?.email || 'hotro@phanbongiatot.com'}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1a5c2a] text-lg">⏰</span>
              <p>Mở cửa: {settings?.openingHours || '07:00 - 21:00 (T2 - CN)'}</p>
            </div>
            
            <div className="footer-map">
               {/* Small map placeholder */}
               <div className="text-center p-4">
                  <span className="block text-2xl mb-2">🗺️</span>
                  <span>Bản đồ kho hàng Tây Nguyên</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
        <p>© 2026 phanbongiatot.com. Giải pháp Nông nghiệp Xanh bền vững.</p>
        <div className="flex gap-6">
           <Link href="/privacy">Bảo mật</Link>
           <Link href="/terms">Điều khoản</Link>
           <Link href="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
