"use client";
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  PhoneCall, 
  MessageCircle, 
  TrendingUp, 
  MousePointer2,
  Eye,
  ArrowUpRight,
  Calendar
} from "lucide-react";

interface Stats {
  summary: {
    totalViews: number;
    totalZalo: number;
    totalCall: number;
    totalLeads: number;
  };
  chartData: any[];
  topPages: any[];
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Fetch stats error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Đang tổng hợp dữ liệu...</p>
    </div>
  );

  const cards = [
    { label: "Tổng lượt xem", value: stats?.summary.totalViews || 0, icon: Eye, color: "bg-blue-500", text: "text-blue-600" },
    { label: "Lượt nhấp Zalo", value: stats?.summary.totalZalo || 0, icon: MessageCircle, color: "bg-[#0068FF]", text: "text-[#0068FF]" },
    { label: "Lượt gọi điện", value: stats?.summary.totalCall || 0, icon: PhoneCall, color: "bg-red-500", text: "text-red-600" },
    { label: "Tổng khách hàng", value: stats?.summary.totalLeads || 0, icon: Users, color: "bg-emerald-600", text: "text-emerald-600" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Tổng Quan Hiệu Quả</h1>
          <p className="text-gray-500 text-sm font-medium">Theo dõi dữ liệu chuyển đổi thời gian thực từ khách hàng.</p>
        </div>
        <button 
          onClick={fetchStats}
          className="bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <Calendar size={14} /> Làm mới dữ liệu
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50 relative overflow-hidden group hover:scale-[1.02] transition-all">
             <div className={`${card.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-gray-200 group-hover:rotate-6 transition-transform`}>
               <card.icon size={24} />
             </div>
             <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{card.label}</span>
                <div className="text-4xl font-black text-gray-900 italic tracking-tighter">
                  {card.value.toLocaleString()}
                </div>
             </div>
             <div className={`absolute top-8 right-8 ${card.text} opacity-20`}>
                <TrendingUp size={48} />
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-black uppercase italic tracking-tight text-gray-900 flex items-center gap-2">
               <BarChart3 className="text-emerald-600" /> Tương tác 7 ngày qua
            </h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đơn vị: Lượt</span>
          </div>
          
          <div className="h-64 flex items-end gap-3 md:gap-6 pt-10 px-4">
             {stats?.chartData && stats.chartData.length > 0 ? (
               stats.chartData.map((day, idx) => {
                 const max = Math.max(...stats.chartData.map(d => d.page_view || 1));
                 const height = ((day.page_view || 0) / max) * 100;
                 return (
                   <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                      {/* Tooltip */}
                      <div className="absolute -top-12 bg-gray-900 text-white px-3 py-2 rounded-xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl whitespace-nowrap">
                         Xem: {day.page_view} | Zalo: {day.zalo_click}
                      </div>
                      
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div 
                          style={{ height: `${height}%` }}
                          className="w-full max-w-[20px] bg-blue-500 rounded-t-lg transition-all group-hover:bg-blue-600 relative"
                        >
                           <div 
                             style={{ height: `${((day.zalo_click || 0) / (day.page_view || 1)) * 100}%` }}
                             className="absolute bottom-0 left-0 w-full bg-emerald-400 rounded-t-lg"
                           ></div>
                        </div>
                      </div>
                      <span className="mt-4 text-[10px] font-black text-gray-400 uppercase rotate-45 origin-left">{day.date.split('-').slice(1).join('/')}</span>
                   </div>
                 )
               })
             ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-300 font-black uppercase text-xs tracking-widest">
                  Đang tích lũy dữ liệu...
               </div>
             )}
          </div>
          
          <div className="mt-16 flex items-center gap-6 justify-center">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Lượt xem</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Lượt Zalo</span>
             </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-50">
           <h3 className="font-black uppercase italic tracking-tight text-gray-900 mb-8 flex items-center gap-2">
             <MousePointer2 className="text-emerald-600" /> Top trang xem nhiều
           </h3>
           
           <div className="space-y-4">
              {stats?.topPages && stats.topPages.length > 0 ? (
                stats.topPages.map((page, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition-all">
                    <div className="flex flex-col gap-1 overflow-hidden">
                       <span className="text-xs font-black text-gray-800 truncate uppercase italic">{page._id}</span>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pathname</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                       <span className="text-sm font-black text-[#1a5c2a] italic">{page.count}</span>
                       <ArrowUpRight size={14} className="text-emerald-500" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center opacity-20">
                   <p className="font-black uppercase text-xs tracking-widest">Đang cập nhật...</p>
                </div>
              )}
           </div>
           
           <div className="mt-10 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
              <h4 className="text-[11px] font-black text-emerald-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                <TrendingUp size={14} /> Mẹo tối ưu CRO
              </h4>
              <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                Tăng kích thước nút Zalo trên các trang có lượt xem cao để cải thiện tỷ lệ chuyển đổi.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
