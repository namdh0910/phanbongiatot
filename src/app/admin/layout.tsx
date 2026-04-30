"use client";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f0f2f5] flex">
        <AdminSidebar />
        <div className="flex-1 lg:ml-64 flex flex-col">
          {/* Admin Header */}
          <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 bg-[#1a5c2a] rounded flex items-center justify-center text-white font-black">P</div>
              <span className="text-sm font-black text-gray-900 uppercase italic">Admin Panel</span>
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hệ thống quản trị vận hành v2.0</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-2">
                <span className="text-xs font-black text-gray-900 leading-none">Admin</span>
                <span className="text-[10px] text-green-500 font-bold uppercase mt-1">Trực tuyến</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm">👤</div>
            </div>
          </header>

          <main className="p-4 md:p-8 flex-1">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
