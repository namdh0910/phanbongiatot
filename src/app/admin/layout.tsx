import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f0f0f1] flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">
          {/* Build timestamp: 2026-04-24T18:45:00Z */}
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
