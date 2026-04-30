"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/admin/orders", label: "Quản lý Đơn hàng", icon: "🛒", badge: "Mới" },
    { href: "/admin/products", label: "Quản lý Sản phẩm", icon: "📦" },
    { href: "/admin/categories", label: "Quản lý Danh mục", icon: "📂" },
    { href: "/admin/blog", label: "Quản lý Blog", icon: "📝" },
    { href: "/admin/vendors", label: "Duyệt Đăng Ký", icon: "📋", badge: "Sellers" },
    { href: "/admin/users", label: "Quản lý Người dùng", icon: "👥" },
    { href: "/admin/settings", label: "Cài đặt", icon: "⚙️" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-[100] w-10 h-10 bg-[#1a5c2a] text-white rounded-lg flex items-center justify-center shadow-lg"
      >
        {isMobileOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-[#1d2327] text-gray-300 z-[70] flex flex-col transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 bg-[#2c3338] border-b border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1a5c2a] rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg">P</div>
          <div className="flex flex-col">
             <span className="text-sm font-black text-white tracking-wider leading-none uppercase italic">Phân Bón</span>
             <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1">Giá Tốt Admin</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 no-scrollbar">
          <div className="px-4 mb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Hệ thống</div>
          <div className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/admin/dashboard' && pathname?.startsWith(link.href));
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-6 py-3.5 text-sm font-bold transition-all relative group ${
                    isActive 
                      ? 'bg-[#1a5c2a] text-white shadow-inner' 
                      : 'hover:bg-[#2c3338] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-60'}`}>{link.icon}</span>
                    <span className="tracking-tight">{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="bg-[#d63638] text-white text-[9px] px-2 py-0.5 rounded-md font-black animate-pulse shadow-sm">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute right-0 top-0 h-full w-1.5 bg-green-400"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 bg-[#2c3338] border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white border border-gray-500">AD</div>
            <div className="flex flex-col min-w-0">
               <span className="text-xs font-black text-white truncate uppercase italic">Quản trị viên</span>
               <span className="text-[9px] text-gray-400 truncate">admin@phanbongiatot.com</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-xs font-black text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <span>🚪</span> ĐĂNG XUẤT
          </button>
        </div>
      </aside>
    </>
  );
}
