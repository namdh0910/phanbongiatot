"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function VendorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/kenh-nguoi-ban", label: "Tổng Quan", icon: "📊" },
    { href: "/kenh-nguoi-ban/products", label: "Sản Phẩm", icon: "📦" },
    { href: "/kenh-nguoi-ban/orders", label: "Đơn Hàng", icon: "🛒", badge: "Mới" },
    { href: "/kenh-nguoi-ban/profile", label: "Cửa Hàng", icon: "🏪" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("userRole");
    router.push("/kenh-nguoi-ban/dang-nhap");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#1a202c] min-h-screen flex-col fixed left-0 top-0 z-50 text-gray-300">
        <div className="p-6 bg-[#2d3748] flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black text-xs">V</div>
          <div className="flex flex-col">
             <span className="text-sm font-black text-white tracking-wider leading-none">GIAN HÀNG</span>
             <span className="text-[10px] text-blue-400 font-bold uppercase">Phân Bón Giá Tốt</span>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center justify-between px-6 py-3 text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-blue-600 text-white border-r-4 border-blue-300' 
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

        <div className="p-4 border-t border-gray-700 bg-[#1a202c]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-xs font-bold text-gray-500 hover:text-red-400 transition-colors"
          >
            <span>🚪</span> ĐĂNG XUẤT
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 flex items-center justify-around px-2 py-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex flex-col items-center gap-1 flex-1 relative ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-tighter">{link.label}</span>
              {link.badge && (
                <span className="absolute top-0 right-1/4 bg-red-500 text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full font-black">
                </span>
              )}
              {isActive && (
                <div className="absolute -top-3 w-8 h-1 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 flex-1 text-gray-400">
           <span className="text-xl">🚪</span>
           <span className="text-[10px] font-black uppercase tracking-tighter">Thoát</span>
        </button>
      </div>
    </>
  );
}
