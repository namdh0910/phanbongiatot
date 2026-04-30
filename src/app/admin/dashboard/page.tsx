"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setStats(await res.json());
      } else {
        setError("Không thể tải dữ liệu thực tế. Đang hiển thị dữ liệu mô phỏng.");
        setStats(getMockStats());
      }
    } catch (err) {
      setError("Lỗi kết nối. Đang hiển thị dữ liệu mô phỏng.");
      setStats(getMockStats());
    } finally {
      setIsLoading(false);
    }
  };

  const getMockStats = () => ({
    today: { newOrders: 12, revenue: 4500000, shipping: 8, returned: 1 },
    week: { newOrders: 85, revenue: 32000000 },
    month: { newOrders: 340, revenue: 125000000 },
    products: { total: 156, lowStock: 5 },
    revenueChart: [4, 5, 2, 8, 3, 9, 6, 4, 10, 5, 7, 3, 6, 8, 12, 5, 7, 9, 4, 6, 8, 10, 15, 12, 8, 6, 9, 11, 14, 10]
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Đang khởi tạo Dashboard...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome & Timeframes */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">Tổng Quan Kinh Doanh</h1>
          <p className="text-sm text-gray-500">Chào mừng trở lại! Dưới đây là hiệu suất cửa hàng của bạn.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm self-start">
          {['Hôm nay', 'Tuần này', 'Tháng này'].map((tab, i) => (
            <button key={i} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${i === 0 ? 'bg-[#1a5c2a] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Đơn hàng mới" 
          value={stats.today.newOrders} 
          unit="Đơn" 
          sub="Hôm nay" 
          icon="🛒" 
          color="bg-green-600" 
          badge={stats.today.newOrders > 5 ? "Cao" : null}
        />
        <StatCard 
          title="Doanh thu" 
          value={stats.today.revenue.toLocaleString()} 
          unit="đ" 
          sub="Hôm nay" 
          icon="💰" 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Sản phẩm đang bán" 
          value={stats.products?.total || 156} 
          unit="SP" 
          sub="Trong kho" 
          icon="📦" 
          color="bg-purple-600" 
        />
        <StatCard 
          title="Đơn cần xử lý" 
          value={stats.today.shipping} 
          unit="Đơn" 
          sub="Chờ lấy hàng" 
          icon="⚡" 
          color="bg-orange-500" 
          urgent={stats.today.shipping > 0}
        />
      </div>

      {/* Chart & Revenue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black text-gray-900 uppercase italic tracking-wider">Doanh thu 30 ngày gần nhất</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
               <span className="w-2 h-2 rounded-full bg-green-500"></span> Doanh thu thực tế (triệu đồng)
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-1">
            {stats.revenueChart?.map((val: number, i: number) => (
              <div 
                key={i} 
                className="flex-1 bg-green-500 hover:bg-[#1a5c2a] transition-all rounded-t-sm relative group cursor-pointer"
                style={{ height: `${(val / 15) * 100}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-xl">
                    Ngày {i+1}: {val}tr
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[9px] font-black text-gray-400 uppercase tracking-widest border-t border-gray-50 pt-4">
            <span>30 ngày trước</span>
            <span>Hôm nay</span>
          </div>
        </div>

        <div className="bg-[#1d2327] p-8 rounded-[2.5rem] text-white shadow-2xl flex flex-col">
          <h3 className="font-black uppercase italic tracking-widest text-green-400 mb-8">Hiệu suất tháng này</h3>
          <div className="space-y-8 flex-1">
            <div className="flex justify-between items-end border-b border-gray-700 pb-4">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase">Tổng doanh thu</p>
                <h4 className="text-3xl font-black italic">₫{(stats.month?.revenue || 125000000).toLocaleString()}</h4>
              </div>
              <span className="text-xs text-green-400 font-bold">+12% ↑</span>
            </div>
            <div className="flex justify-between items-end border-b border-gray-700 pb-4">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase">Tổng đơn hàng</p>
                <h4 className="text-3xl font-black italic">{stats.month?.newOrders || 340}</h4>
              </div>
              <span className="text-xs text-green-400 font-bold">+5% ↑</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase">Giá trị TB đơn</p>
                <h4 className="text-3xl font-black italic">₫368.000</h4>
              </div>
              <span className="text-xs text-red-400 font-bold">-2% ↓</span>
            </div>
          </div>
          <Link href="/admin/analytics" className="mt-8 w-full py-4 bg-green-500 hover:bg-green-600 text-white text-center rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
            Chi tiết báo cáo ➜
          </Link>
        </div>
      </div>

      {/* Notifications & Low Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-black text-gray-900 uppercase italic tracking-wider">Thông báo vận hành</h3>
             <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
          <div className="space-y-4">
            <NotificationItem icon="🚨" text="Có 5 đơn hàng chưa xác nhận quá 2 giờ" time="10 phút trước" urgent />
            <NotificationItem icon="💬" text="Bạn có 3 yêu cầu hỗ trợ mới từ khách hàng" time="25 phút trước" />
            <NotificationItem icon="⭐" text="Có đánh giá 1 sao mới cho sản phẩm Sầu Riêng" time="1 giờ trước" urgent />
            <NotificationItem icon="📝" text="Sản phẩm 'Phân bón lá Acti-Root' vừa hết hàng" time="3 giờ trước" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-black text-gray-900 uppercase italic tracking-wider">Sản phẩm sắp hết kho</h3>
             <Link href="/admin/products" className="text-[10px] font-black text-green-600 hover:underline">Xem kho →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                 <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                 <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-gray-800 truncate">Sản phẩm #{i}</p>
                    <p className="text-[10px] font-black text-red-500">Còn 2 SP</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, sub, icon, color, urgent, badge }: any) {
  return (
    <div className={`p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all relative overflow-hidden group`}>
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform`}></div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {urgent && <span className="bg-orange-100 text-orange-600 text-[8px] font-black uppercase px-2 py-1 rounded-full animate-pulse">Cần xử lý</span>}
        {badge && <span className="bg-green-100 text-green-600 text-[8px] font-black uppercase px-2 py-1 rounded-full">{badge}</span>}
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter italic">{value}</h3>
        <span className="text-xs font-bold text-gray-400 uppercase">{unit}</span>
      </div>
      <p className="mt-4 text-[9px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1">
        <span className="w-1 h-1 bg-green-500 rounded-full"></span> {sub}
      </p>
    </div>
  );
}

function NotificationItem({ icon, text, time, urgent }: any) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${urgent ? 'bg-red-50 border border-red-100' : 'hover:bg-gray-50'}`}>
       <span className="text-xl">{icon}</span>
       <div className="flex-1 min-w-0">
          <p className={`text-xs font-bold ${urgent ? 'text-red-900' : 'text-gray-800'} line-clamp-1`}>{text}</p>
          <p className="text-[9px] text-gray-400 font-medium">{time}</p>
       </div>
       <span className="text-gray-300 text-xs">➜</span>
    </div>
  );
}
