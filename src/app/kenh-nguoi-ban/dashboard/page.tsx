"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data
const MOCK_STATS = {
  ordersToday: 5,
  revenueMonth: 12500000,
  activeProducts: 12,
  pendingProducts: 3,
  rejectedProducts: 1
};

const MOCK_ORDERS = [
  { id: "PBG-1001", customer: "Nguyễn Văn A", total: 450000, status: "new", time: "10:30 AM" },
  { id: "PBG-1002", customer: "Trần Thị B", total: 1200000, status: "shipping", time: "09:15 AM" },
  { id: "PBG-1003", customer: "Lê Văn C", total: 350000, status: "done", time: "Hôm qua" },
  { id: "PBG-1004", customer: "Phạm Văn D", total: 850000, status: "new", time: "Hôm qua" },
  { id: "PBG-1005", customer: "Hoàng Văn E", total: 600000, status: "cancelled", time: "Hôm qua" }
];

export default function SellerDashboard() {
  const [shopName, setShopName] = useState("Cửa hàng");
  const router = useRouter();

  useEffect(() => {
    const info = localStorage.getItem("vendorInfo");
    if (info) {
      try {
        const parsed = JSON.parse(info);
        setShopName(parsed.storeName || "Cửa hàng");
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    localStorage.removeItem("userRole");
    router.push("/kenh-nguoi-ban/dang-nhap");
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Main Content */}
      <main className="flex-1 pb-24 lg:pb-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Xin chào, {shopName} 👋</h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Hôm nay vườn của bạn thế nào?</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
            title="Đăng xuất"
          >
            🚪
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4 text-xl">📦</div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Đơn hàng mới</p>
            <p className="text-2xl font-black text-gray-900">{MOCK_STATS.ordersToday}</p>
            <p className="text-[10px] text-blue-500 font-bold mt-1">+2 so với hôm qua</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-4 text-xl">💰</div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Doanh thu tháng</p>
            <p className="text-2xl font-black text-gray-900">{(MOCK_STATS.revenueMonth / 1000000).toFixed(1)}M</p>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">Đã cập nhật</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-4 text-xl">✨</div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sản phẩm bán</p>
            <p className="text-2xl font-black text-gray-900">{MOCK_STATS.activeProducts}</p>
            <p className="text-[10px] text-gray-400 font-bold mt-1">Đang hiển thị</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center mb-4 text-xl">⏳</div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Chờ duyệt</p>
            <p className="text-2xl font-black text-gray-900">{MOCK_STATS.pendingProducts}</p>
            <p className="text-[10px] text-purple-500 font-bold mt-1">Đang xử lý</p>
          </div>
        </div>

        {/* Rejected Products Alert */}
        {MOCK_STATS.rejectedProducts > 0 && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-8 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <p className="text-red-800 font-bold text-sm">
                Bạn có {MOCK_STATS.rejectedProducts} sản phẩm bị từ chối phê duyệt.
              </p>
            </div>
            <Link href="/kenh-nguoi-ban/san-pham?filter=rejected" className="text-red-600 text-xs font-black underline uppercase tracking-widest">
              Xem lý do
            </Link>
          </div>
        )}

        {/* Recent Orders */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-black text-gray-900 uppercase tracking-tight">Đơn hàng gần đây</h2>
            <Link href="/kenh-nguoi-ban/don-hang" className="text-[10px] font-black text-[#1a5c2a] uppercase tracking-widest">Xem tất cả ➜</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-6 py-4">Mã đơn</th>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Tổng tiền</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-black text-blue-600 text-xs">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-800 text-sm">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-gray-900 text-sm">₫{order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        order.status === 'new' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'shipping' ? 'bg-yellow-100 text-yellow-600' :
                        order.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {order.status === 'new' ? 'Mới' : order.status === 'shipping' ? 'Giao hàng' : order.status === 'done' ? 'Hoàn tất' : 'Đã hủy'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{order.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-[100] safe-area-inset-bottom">
         <Link href="/kenh-nguoi-ban/dashboard" className="flex flex-col items-center gap-1 text-[#1a5c2a]">
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Tổng quan</span>
         </Link>
         <Link href="/kenh-nguoi-ban/san-pham" className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">📦</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Sản phẩm</span>
         </Link>
         <Link href="/kenh-nguoi-ban/don-hang" className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl relative">
              🛒
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">2</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Đơn hàng</span>
         </Link>
         <Link href="/kenh-nguoi-ban/ho-so" className="flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">Tài khoản</span>
         </Link>
      </nav>
    </div>
  );
}
