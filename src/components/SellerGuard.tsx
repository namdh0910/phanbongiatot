"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    const role = localStorage.getItem("userRole");

    if (!token || (role !== "vendor" && role !== "admin")) {
      router.push("/kenh-nguoi-ban/dang-nhap");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1a5c2a] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-[#1a5c2a] text-sm tracking-widest uppercase">Đang bảo mật gian hàng...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
