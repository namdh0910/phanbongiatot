"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SellerMobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: "/kenh-nguoi-ban/dashboard", label: "Tổng Quan", icon: "🏠" },
    { href: "/kenh-nguoi-ban/san-pham", label: "Sản Phẩm", icon: "📦" },
    { href: "/kenh-nguoi-ban/don-hang", label: "Đơn Hàng", icon: "🛒" },
    { href: "/kenh-nguoi-ban/doanh-thu", label: "Doanh Thu", icon: "💰" },
    { href: "/kenh-nguoi-ban/ho-so", label: "Hồ Sơ Shop", icon: "🏪" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("userRole");
    router.push("/kenh-nguoi-ban/dang-nhap");
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a5c2a] rounded-lg flex items-center justify-center text-white font-black text-lg">P</div>
          <span className="font-black text-gray-900 tracking-tight text-sm">PBGT</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-200 px-3 py-1.5 rounded-full">Trang chủ</Link>
          <button 
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Slide-over Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          {/* Content */}
          <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
               <h2 className="font-black text-gray-900 uppercase tracking-widest text-xs">Menu Kênh Người Bán</h2>
               <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-400">✕</button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${
                    pathname === item.href ? 'bg-green-50 text-[#1a5c2a]' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-3">
               <Link href="/" className="block w-full text-center py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-sm">
                  Quay lại Website
               </Link>
               <button 
                 onClick={handleLogout}
                 className="block w-full text-center py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm"
               >
                 Đăng xuất
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
