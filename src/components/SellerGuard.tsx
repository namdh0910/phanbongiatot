"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerGuard({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    const role = localStorage.getItem("userRole");
    const info = localStorage.getItem("vendorInfo");

    if (!token || (role !== "vendor" && role !== "admin")) {
      router.push("/kenh-nguoi-ban/dang-nhap");
    } else {
      if (info) {
        try {
          const parsed = JSON.parse(info);
          if (parsed.isApproved || role === 'admin') {
            setIsApproved(true);
          }
        } catch (e) {}
      }
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1a5c2a] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-[#1a5c2a] text-sm tracking-widest uppercase">Đang bảo mật...</p>
        </div>
      </div>
    );
  }

  if (isAuthorized && !isApproved) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg w-full text-center border border-gray-100">
          <div className="text-8xl mb-8">⏳</div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">Hồ sơ đang chờ duyệt!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed font-medium">
            Cảm ơn bạn đã đăng ký gia nhập hệ thống <b>Phân Bón Giá Tốt</b>. Hiện tại đội ngũ quản trị đang kiểm tra hồ sơ của bạn. Quá trình này thường mất từ <b>24-48h</b>.
          </p>
          <div className="space-y-4">
             <a href={`https://zalo.me/0773440966`} target="_blank" className="block w-full bg-[#0068ff] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-600 transition-all">
               Hỗ trợ kích hoạt nhanh
             </a>
             <button 
               onClick={() => {
                 localStorage.removeItem("vendorToken");
                 localStorage.removeItem("vendorInfo");
                 localStorage.removeItem("userRole");
                 router.push("/kenh-nguoi-ban/dang-nhap");
               }}
               className="block w-full text-gray-400 font-bold hover:text-gray-600 text-sm"
             > 
               Đăng xuất & Quay lại 
             </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
