"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin", label: "Sản Phẩm", icon: "📦" },
    { href: "/admin/approve-products", label: "Duyệt SP", icon: "⚖️", badge: "Mới" },
    { href: "/admin/vendors", label: "Đối Tác", icon: "🏪" },
    { href: "/admin/orders", label: "Đơn Hàng", icon: "🛒", badge: "Mới" },
    { href: "/admin/coupons", label: "Mã Giảm Giá", icon: "🎟️" },
    { href: "/admin/reviews", label: "Đánh Giá SP", icon: "⭐" },
    { href: "/admin/leads", label: "Khách Liên Hệ", icon: "👥" },
    { href: "/admin/blog", label: "Bài Viết", icon: "📝" },
    { href: "/admin/settings", label: "Cài Đặt", icon: "⚙️" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#1d2327] min-h-screen flex flex-col fixed left-0 top-0 z-50 text-gray-300">
      {/* Sidebar Header */}
      <div className="p-6 bg-[#2c3338] flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black">P</div>
        <div className="flex flex-col">
           <span className="text-sm font-black text-white tracking-wider leading-none">PHÂN BÓN</span>
           <span className="text-[10px] text-emerald-400 font-bold">GIÁ TỐT ADMIN</span>
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
                  ? 'bg-[#2271b1] text-white' 
                  : 'hover:bg-[#2c3338] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-lg ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{link.icon}</span>
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="bg-[#d63638] text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700 bg-[#1d2327]">
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
