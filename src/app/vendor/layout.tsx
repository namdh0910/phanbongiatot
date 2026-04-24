import VendorGuard from "@/components/VendorGuard";
import VendorSidebar from "@/components/VendorSidebar";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <VendorGuard>
      <div className="flex bg-[#f7fafc] min-h-screen">
        <VendorSidebar />
        <main className="flex-1 ml-64 min-h-screen">
          {children}
        </main>
      </div>
    </VendorGuard>
  );
}
