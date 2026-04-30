"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [vendorName, setVendorName] = useState("Cửa hàng");

  useEffect(() => {
    const info = localStorage.getItem("vendorInfo");
    if (info) {
      try {
        const parsed = JSON.parse(info);
        setVendorName(parsed.storeName || "Cửa hàng");
      } catch (e) {}
    }
  }, []);

  const links = [
    { href: "/", label: "Quay lại Website", icon: "🌐" },
    { href: "/kenh-nguoi-ban/dashboard", label: "Tổng Quan", icon: "🏠" },
    { href: "/kenh-nguoi-ban/san-pham", label: "Quản Lý Sản Phẩm", icon: "📦" },
    { href: "/kenh-nguoi-ban/don-hang", label: "Đơn Hàng Mới", icon: "🛒", badge: "2" },
    { href: "/kenh-nguoi-ban/doanh-thu", label: "Doanh Thu", icon: "💰" },
    { href: "/kenh-nguoi-ban/ho-so", label: "Hồ Sơ Shop", icon: "🏪" },
    { href: "/kenh-nguoi-ban/ho-tro", label: "Hỗ Trợ Kỹ Thuật", icon: "🎧" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("userRole");
    router.push("/kenh-nguoi-ban/dang-nhap");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* Sidebar Header */}
      <div className="p-6 bg-white border-b border-gray-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1a5c2a] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-100">
          S
        </div>
        <div className="flex flex-col">
           <span className="text-sm font-black text-gray-900 tracking-tight leading-none uppercase">SELLER CENTER</span>
           <span className="text-[10px] text-gray-400 font-bold mt-1">PHÂN BÓN GIÁ TỐT</span>
        </div>
      </div>

      {/* User Summary */}
      <div className="p-6 bg-gray-50/50">
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Đang đăng nhập</p>
         <p className="text-sm font-black text-[#1a5c2a] truncate">{vendorName}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                isActive 
                  ? 'bg-green-50 text-[#1a5c2a]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{link.icon}</span>
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="bg-[#ee4d2d] text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-bold text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <span>🚪</span> Đăng xuất
        </button>
      </div>
    </aside>
  );
}
