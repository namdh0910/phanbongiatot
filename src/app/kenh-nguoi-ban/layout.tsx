"use client";
import SellerGuard from "@/components/SellerGuard";
import SellerSidebar from "@/components/SellerSidebar";
import { usePathname } from "next/navigation";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Skip guard and sidebar for landing, login and register pages
  const isAuthPage = pathname === "/kenh-nguoi-ban" || pathname === "/kenh-nguoi-ban/dang-nhap" || pathname === "/kenh-nguoi-ban/dang-ky";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SellerGuard>
      <div className="bg-[#f8fafc] min-h-screen">
        {/* Sidebar only for desktop */}
        <div className="hidden lg:block">
          <SellerSidebar />
        </div>
        
        {/* Main Content */}
        <div className="lg:ml-64 min-h-screen">
          {children}
        </div>
      </div>
    </SellerGuard>
  );
}
