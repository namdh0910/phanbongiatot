"use client";
import VendorGuard from "@/components/VendorGuard";
import VendorSidebar from "@/components/VendorSidebar";
import { usePathname } from "next/navigation";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Skip guard and sidebar for landing, login and register pages
  const isAuthPage = pathname === "/kenh-nguoi-ban" || pathname === "/kenh-nguoi-ban/dang-nhap" || pathname === "/kenh-nguoi-ban/dang-ky";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <VendorGuard>
      <div className="flex flex-col md:flex-row bg-[#f7fafc] min-h-screen">
        <VendorSidebar />
        <main className="flex-1 md:ml-64 min-h-screen pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </VendorGuard>
  );
}
