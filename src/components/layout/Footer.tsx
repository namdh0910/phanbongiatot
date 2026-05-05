"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import { MapPin, Phone, MessageCircle, ChevronRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const settings = useSettings();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer id="footer" className="bg-gray-900 text-white pt-20 pb-[100px] md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 border-b border-white/10 pb-16">
          <div>
            <Link href="/" className="inline-block mb-8">
              <span className="font-black text-3xl tracking-tighter">
                PhânBón<span className="text-[#f5a623]">GiáTốt</span>
              </span>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Nền tảng chia sẻ kiến thức kỹ thuật và cung cấp giải pháp nông nghiệp chuyên biệt cho cây trồng vùng cao nguyên.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/phanbongiatot1" target="_blank" className="w-10 h-10 bg-white/10 rounded-xl hover:bg-[#1877F2] transition-colors flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.youtube.com/@phanbongiatot" target="_blank" className="w-10 h-10 bg-white/10 rounded-xl hover:bg-[#FF0000] transition-colors flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8">Liên Hệ</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start gap-4">
                <MapPin className="text-[#f5a623] shrink-0" size={20} />
                <span>{settings?.address || 'Kho hàng: TP. Buôn Ma Thuột, Tỉnh Đắk Lắk'}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-[#f5a623] shrink-0" size={20} />
                <span className="text-white font-black">{settings?.phone || settings?.hotline || '0773.440.966'}</span>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle className="text-[#f5a623] shrink-0" size={20} />
                <span>Zalo: {settings?.zalo || '0773440966'}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8">Liên Kết Nhanh</h4>
            <ul className="space-y-4">
              {[
                { label: 'Tất cả sản phẩm', href: '/san-pham' },
                { label: 'Gói giải pháp tiết kiệm', href: '/combo' },
                { label: 'Tài liệu kỹ thuật', href: '/blog' },
                { label: 'Giới thiệu', href: '/ve-chung-toi' },
                { label: 'Chính sách vận chuyển', href: '/chinh-sach-van-chuyen' },
                { label: 'Chính sách bảo hành', href: '/chinh-sach-bao-hanh' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors">
                    <ChevronRight size={14} className="text-[#f5a623] group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm font-bold">
          <p>© 2026 {settings?.siteName || 'Phân Bón Giá Tốt'}. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
