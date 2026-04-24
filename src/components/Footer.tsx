"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

export default function Footer() {
  const pathname = usePathname();
  const settings = useSettings();

  if (pathname?.startsWith('/admin')) return null;
  if (!settings) return null;

  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight">
            PhânBón<span className="text-yellow-500">GiáTốt</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Chuyên cung cấp giải pháp nông nghiệp bền vững cho bà con nông dân. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao với giá thành tốt nhất thị trường.
          </p>
          <div className="flex gap-4">
             <span className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">f</span>
             <span className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">y</span>
             <span className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">z</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">Sản phẩm chính</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/danh-muc/phan-bon" className="hover:text-primary transition-colors">Phân bón sinh học</Link></li>
            <li><Link href="/danh-muc/thuoc-tru-sau" className="hover:text-primary transition-colors">Thuốc đặc trị sâu bệnh</Link></li>
            <li><Link href="/danh-muc/kich-re" className="hover:text-primary transition-colors">Siêu kích rễ cực mạnh</Link></li>
            <li><Link href="/danh-muc/tuyen-trung" className="hover:text-primary transition-colors">Đặc trị tuyến trùng rễ</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">Hỗ trợ khách hàng</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/chinh-sach-van-chuyen" className="hover:text-primary transition-colors">Chính sách vận chuyển</Link></li>
            <li><Link href="/chinh-sach-bao-hanh" className="hover:text-primary transition-colors">Chính sách đổi trả</Link></li>
            <li><Link href="/tra-cuu-don-hang" className="hover:text-primary transition-colors">Tra cứu đơn hàng</Link></li>
            <li><Link href="/huong-dan-mua-hang" className="hover:text-primary transition-colors">Hướng dẫn mua hàng</Link></li>
            <li><Link href="/lien-he" className="hover:text-primary transition-colors">Liên hệ kỹ sư tư vấn</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">Liên hệ</h4>
          <div className="space-y-4 text-gray-400 text-sm">
            <div className="flex gap-3">
              <span className="text-primary text-lg">📍</span>
              <p>{settings.footerAddress || settings.address}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg">📞</span>
              <div>
                <p className="font-bold text-white text-base">{settings.phone || settings.hotline}</p>
                <p className="text-[10px] uppercase">Hỗ trợ kỹ thuật 24/7</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg">📧</span>
              <p>{settings.footerEmail || settings.email}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-primary text-lg">⏰</span>
              <p>Làm việc: {settings.businessHours || "07:00 - 21:00"} (Tất cả các ngày)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
        <p>© 2026 phanbongiatot.com. Bản quyền thuộc về Giải Pháp Nông Nghiệp Xanh.</p>
      </div>
    </footer>
  );
}
