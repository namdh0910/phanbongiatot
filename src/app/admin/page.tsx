"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setStats(await res.json());
      } else {
        setError(`Lỗi: ${res.status} ${res.statusText}`);
      }
    } catch (err: any) {
      setError(err.message || "Lỗi kết nối máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <AdminGuard>
        <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar />
          <div className="flex-1 p-8 ml-64 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <div className="text-emerald-600 font-bold animate-pulse">Đang tải dữ liệu vận hành...</div>
          </div>
        </div>
      </AdminGuard>
    );
  }

  if (error || !stats) {
    return (
      <AdminGuard>
        <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar />
          <div className="flex-1 p-8 ml-64 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-black text-gray-800 mb-4 uppercase">Không thể tải dữ liệu</h2>
            <p className="text-gray-500 mb-8 max-w-md">{error || "Hệ thống không trả về dữ liệu thống kê."}</p>
            <button 
              onClick={fetchStats}
              className="bg-[#1a5c2a] text-white px-8 py-3 rounded-xl font-black shadow-lg hover:bg-[#2d7a3e] transition-all"
            >
              THỬ LẠI NGAY
            </button>
          </div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8 ml-64 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Tổng quan vận hành</h1>
              <p className="text-sm text-gray-500 font-medium italic">Cập nhật lúc: {new Date().toLocaleTimeString("vi-VN")}</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                <span className="text-green-500 text-lg">●</span>
                <span className="text-xs font-black uppercase text-gray-500">Hệ thống: Online</span>
              </div>
            </div>
          </div>

          {/* Today Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-[#1a5c2a] transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Đơn hàng mới hôm nay</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-gray-900">{stats.today.newOrders}</h3>
                <span className="text-xs font-bold text-green-500">Đơn</span>
              </div>
              <div className="mt-4 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className="bg-[#1a5c2a] h-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-blue-500 transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Doanh thu hôm nay</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-blue-600">₫{stats.today.revenue.toLocaleString()}</h3>
              </div>
              <p className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">Tổng giá trị đơn đã chốt</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-orange-500 transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Đang giao hàng</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-orange-600">{stats.today.shipping}</h3>
                <span className="text-xs font-bold text-orange-500">Vận đơn</span>
              </div>
              <Link href="/admin/orders?status=shipping" className="mt-4 text-[10px] text-orange-500 font-black uppercase hover:underline">Xem danh sách →</Link>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-red-500 transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Đơn hoàn/hủy</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-red-600">{stats.today.returned}</h3>
                <span className="text-xs font-bold text-red-500">Đơn</span>
              </div>
              <p className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">Tỷ lệ: {stats.today.newOrders > 0 ? ((stats.today.returned / stats.today.newOrders) * 100).toFixed(1) : 0}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top 10 Best Sellers */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-black text-gray-900 uppercase italic">Sản phẩm bán chạy nhất</h2>
                  <Link href="/admin/products" className="text-[10px] font-black text-[#1a5c2a] uppercase hover:underline">Quản lý kho →</Link>
               </div>
               <div className="space-y-6">
                  {stats.products.top.map((p: any, idx: number) => (
                    <div key={p._id} className="flex items-center gap-4 group">
                       <span className="text-xl font-black text-gray-100 group-hover:text-[#1a5c2a] transition-colors">#{idx + 1}</span>
                       <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                          <img src={p.images?.[0]} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-black text-gray-800 line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{p.category}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-black text-gray-900">{p.sold}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase">Đã bán</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               {/* Low Stock Alert */}
               <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="text-2xl">⚠️</span>
                     <h2 className="text-lg font-black text-red-900 uppercase italic">Cảnh báo hết hàng</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     {stats.products.lowStock.slice(0, 4).map((p: any) => (
                       <div key={p._id} className="bg-white p-4 rounded-2xl border border-red-100 shadow-sm">
                          <p className="text-[11px] font-bold text-gray-800 line-clamp-1 mb-2">{p.name}</p>
                          <div className="flex justify-between items-center">
                             <span className="text-xs font-black text-red-600">Còn {p.stock}</span>
                             <Link href="/admin/products" className="text-[9px] font-black bg-red-600 text-white px-2 py-1 rounded-md uppercase">NHẬP</Link>
                          </div>
                       </div>
                     ))}
                  </div>
                  {stats.products.lowStock.length > 4 && (
                    <p className="mt-4 text-[10px] text-red-400 font-bold text-center">Và {stats.products.lowStock.length - 4} sản phẩm khác...</p>
                  )}
               </div>

               {/* Seller Alerts */}
               <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                  <h2 className="text-lg font-black text-gray-900 uppercase italic mb-6">Hiệu suất Seller</h2>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100 mb-4">
                     <div className="flex items-center gap-3">
                        <span className="text-2xl animate-bounce">⏳</span>
                        <div>
                           <p className="text-xs font-black text-orange-900 uppercase">Đơn chờ quá 2h</p>
                           <p className="text-[10px] text-orange-700 font-medium italic">Yêu cầu Seller xác nhận ngay</p>
                        </div>
                     </div>
                     <span className="text-3xl font-black text-orange-600">{stats.sellers.unconfirmedLong}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Geography Stats */}
          <div className="bg-emerald-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-900/20">
             <h2 className="text-lg font-black uppercase italic mb-8 tracking-widest">Doanh thu theo tỉnh thành (Top 10)</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.geography.map((item: any) => (
                  <div key={item._id} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                     <p className="text-[10px] font-black uppercase text-emerald-200 mb-1">{item._id || 'Không xác định'}</p>
                     <p className="text-xl font-black">₫{item.revenue.toLocaleString()}</p>
                     <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-emerald-300 uppercase">
                        <span>{item.count} đơn</span>
                        <span>{(item.revenue / item.count).toLocaleString()}đ/đơn</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
