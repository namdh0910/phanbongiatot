"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    { href: "/admin/dashboard", label: "Tổng Quan (Stats)", icon: "📊" },
    { href: "/admin/leads", label: "Khách Hàng (Leads)", icon: "💬" },
    { href: "/admin/blogs", label: "Nội Dung (Blog/Video)", icon: "🎥" },
    { href: "/admin/solutions", label: "Quy trình xử lý (Guides)", icon: "🩺" },
    { href: "/admin/products", label: "Sản Phẩm (Catalog)", icon: "📦" },
    { href: "/admin/settings", label: "Cấu Hình (Settings)", icon: "⚙️" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };

    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return pathname === '/admin/dashboard';
    return pathname?.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
      router.push("/admin/login");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? "Đóng menu" : "Mở menu"}
        className="lg:hidden fixed top-4 right-4 z-[100] w-10 h-10 bg-[#1a5c2a] text-white rounded-lg flex items-center justify-center shadow-lg"
      >
        {isMobileOpen ? "✕" : "☰"}
      </button>

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
        <div className="p-6 bg-[#2c3338] border-b border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1a5c2a] rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg">P</div>
          <div className="flex flex-col">
             <span className="text-sm font-black text-white tracking-wider leading-none uppercase italic">Admin</span>
             <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1">Quản Trị Vận Hành</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <div className="space-y-1">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-bold transition-all ${
                    active 
                      ? 'bg-[#1a5c2a] text-white shadow-inner border-r-4 border-green-400' 
                      : 'hover:bg-[#2c3338] hover:text-white text-gray-400'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="tracking-tight">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 bg-[#2c3338] border-t border-gray-700">
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
