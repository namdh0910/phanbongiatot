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
      <div className="min-h-screen bg-[#f0f0f1] flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
