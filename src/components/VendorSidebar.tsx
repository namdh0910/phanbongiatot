"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function VendorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/vendor", label: "Tổng Quan", icon: "📊" },
    { href: "/vendor/products", label: "Sản Phẩm Của Tôi", icon: "📦" },
    { href: "/vendor/orders", label: "Đơn Hàng Mới", icon: "🛒", badge: "Mới" },
    { href: "/vendor/profile", label: "Thông Tin Shop", icon: "🏪" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("userRole");
    router.push("/vendor/dang-nhap");
  };

  return (
    <aside className="w-64 bg-[#1a202c] min-h-screen flex flex-col fixed left-0 top-0 z-50 text-gray-300">
      {/* Sidebar Header */}
      <div className="p-6 bg-[#2d3748] flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black text-xs">V</div>
        <div className="flex flex-col">
           <span className="text-sm font-black text-white tracking-wider leading-none">GIAN HÀNG</span>
           <span className="text-[10px] text-blue-400 font-bold uppercase">Phân Bón Giá Tốt</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center justify-between px-6 py-3 text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-[#2d3748] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{link.icon}</span>
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700 bg-[#1a202c]">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-bold text-gray-500 hover:text-red-400 transition-colors"
        >
          <span>🚪</span> ĐĂNG XUẤT
        </button>
      </div>
    </aside>
  );
}
