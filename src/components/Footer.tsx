"use client";
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
            Chuyên gia cung cấp giải pháp dinh dưỡng và bảo vệ cây trồng hàng đầu Việt Nam. Chúng tôi đồng hành cùng nhà nông nâng tầm giá trị nông sản.
          </p>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Kết nối với chúng tôi</h4>
            <div className="footer-social-grid">
              <a href="#" className="social-icon-btn">f</a>
              <a href="#" className="social-icon-btn">y</a>
              <a href="#" className="social-icon-btn">i</a>
              <a href="#" className="social-icon-btn">t</a>
            </div>
          </div>
          <div className="pt-4">
            <img src="https://web.archive.org/web/20210515153257im_/http://online.gov.vn/Content/Images/da-thong-bao.png" alt="Đã thông báo bộ công thương" className="footer-cert" />
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
            <li><Link href="/danh-muc/kich-re" className="hover:text-[#1a5c2a] transition-colors">Siêu kích rễ cực mạnh</Link></li>
            <li><Link href="/danh-muc/tuyen-trung" className="hover:text-[#1a5c2a] transition-colors">Đặc trị tuyến trùng</Link></li>
            <li><Link href="/danh-muc/thuoc-bvtv" className="hover:text-[#1a5c2a] transition-colors">Thuốc BVTV cao cấp</Link></li>
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
              <p>{settings?.footerAddress || settings?.address || "Kho hàng: TP. Buôn Ma Thuột, Đắk Lắk"}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1a5c2a] text-lg">📞</span>
              <div>
                <p className="font-black text-white text-base">{settings?.hotline || "0773.440.966"}</p>
                <p className="text-[10px] uppercase font-bold text-gray-500">Kỹ sư tư vấn 24/7</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1a5c2a] text-lg">⏰</span>
              <p>Mở cửa: 07:00 - 21:00 (T2 - CN)</p>
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
