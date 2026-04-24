"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    const role = localStorage.getItem("userRole");
    
    if (!token || (role !== "vendor" && role !== "admin")) {
      router.push("/vendor/dang-nhap");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
