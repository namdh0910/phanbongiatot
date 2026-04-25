"use client";
import { useState, useEffect } from "react";
import SellerSidebar from "@/components/SellerSidebar";
import SellerGuard from "@/components/SellerGuard";
import Link from "next/link";

export default function SellerDashboard() {
  const [vendorInfo, setVendorInfo] = useState<any>(null);

  useEffect(() => {
    const info = localStorage.getItem("vendorInfo");
    if (info) {
      try {
        setVendorInfo(JSON.parse(info));
      } catch (e) {}
    }
  }, []);

  const stats = [
    { label: "Doanh thu tháng này", value: "24.500.000đ", icon: "💰", trend: "+12%" },
    { label: "Đơn hàng mới", value: "12", icon: "📦", trend: "Hôm nay" },
    { label: "Sản phẩm đang bán", value: "48", icon: "🌿", trend: "Ổn định" },
    { label: "Đánh giá tích cực", value: "4.8/5", icon: "⭐", trend: "98 lượt" },
  ];

  return (
    <SellerGuard>
      <div className="flex bg-[#f8fafc] min-h-screen">
        <SellerSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Chào anh/chị, {vendorInfo?.fullName || "Đối tác"}! 👋</h1>
            <p className="text-gray-500 font-medium text-lg italic">Chúc anh chị một ngày mua may bán đắt tại Phân Bón Giá Tốt.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-[#1a5c2a] transition-all cursor-default">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-gray-50 p-3 rounded-2xl group-hover:bg-green-50 transition-colors">{s.icon}</span>
                    <span className={`text-xs font-black px-2 py-1 rounded-lg ${s.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {s.trend}
                    </span>
                 </div>
                 <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{s.label}</p>
                 <p className="text-2xl font-black text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-8">
                {/* Recent Orders Table Placeholder */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                   <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                      <h2 className="text-xl font-black text-gray-900">Đơn hàng mới nhất</h2>
                      <Link href="/kenh-nguoi-ban/don-hang" className="text-sm font-bold text-[#1a5c2a] hover:underline">Xem tất cả →</Link>
                   </div>
                   <div className="p-6">
                      <div className="space-y-4">
                         {[1, 2, 3].map(i => (
                           <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-green-50 transition-all border border-transparent hover:border-green-100">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">📦</div>
                                 <div>
                                    <p className="font-black text-gray-900">PBG-260424-000{i}</p>
                                    <p className="text-xs text-gray-400 font-bold">Khách: Nguyễn Văn {i === 1 ? 'An' : i === 2 ? 'Bình' : 'Cường'}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="font-black text-red-600">1.250.000đ</p>
                                 <span className="text-[10px] font-black text-emerald-600 uppercase">Chờ xác nhận</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             <div className="space-y-8">
                {/* Quick Actions */}
                <div className="bg-[#1a5c2a] text-white p-8 rounded-[2rem] shadow-xl shadow-green-900/10">
                   <h2 className="text-xl font-black mb-6 italic tracking-tight">Thao tác nhanh</h2>
                   <div className="grid grid-cols-1 gap-3">
                      <Link href="/kenh-nguoi-ban/san-pham" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10">
                         <span className="text-xl">➕</span>
                         <span className="font-bold">Thêm sản phẩm mới</span>
                      </Link>
                      <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 text-left">
                         <span className="text-xl">🖨️</span>
                         <span className="font-bold">In phiếu đóng gói</span>
                      </button>
                      <Link href="/kenh-nguoi-ban/ho-so" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10">
                         <span className="text-xl">⚙️</span>
                         <span className="font-bold">Cài đặt gian hàng</span>
                      </Link>
                   </div>
                </div>

                {/* Announcement */}
                <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-[2rem]">
                   <h3 className="text-sm font-black text-yellow-800 mb-3 flex items-center gap-2">
                     <span className="text-lg">📢</span> Thông báo từ sàn
                   </h3>
                   <div className="space-y-4">
                      <div className="border-l-2 border-yellow-400 pl-3">
                         <p className="text-xs font-bold text-gray-800">Miễn phí ship cho đơn trên 1tr</p>
                         <p className="text-[10px] text-gray-500">Chương trình áp dụng từ 25/04 - 01/05 cho tất cả đại lý.</p>
                      </div>
                      <div className="border-l-2 border-yellow-400 pl-3">
                         <p className="text-xs font-bold text-gray-800">Cập nhật chính sách đối soát</p>
                         <p className="text-[10px] text-gray-500">Kỳ thanh toán sẽ được đổi sang Thứ 2 hàng tuần.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </main>
      </div>
    </SellerGuard>
  );
}
