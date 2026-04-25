"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // In a real app, these would be separate API calls or one aggregate call
      // For this demo, we'll simulate the data structure requested
      const leadsRes = await fetch(`${API_BASE_URL}/leads`, { headers: getAuthHeaders() });
      const leadsData = await leadsRes.json();
      setLeads(Array.isArray(leadsData) ? leadsData : []);

      // Mocking the analytics stats as backend might not have this aggregate yet
      setStats({
        today: { orders: 12, revenue: 5400000 },
        week: { orders: 84, revenue: 38200000 },
        month: { orders: 320, revenue: 145000000 },
        topProducts: [
          { name: "Phân bón Acti Rooti", sales: 150, revenue: 27000000, ratio: 18 },
          { name: "Nemano Tuyến Trùng", sales: 120, revenue: 21600000, ratio: 15 },
          { name: "Siêu Lân Đỏ", sales: 85, revenue: 18700000, ratio: 12 },
          { name: "Combo Phục Hồi", sales: 45, revenue: 18900000, ratio: 13 }
        ],
        newVendorsThisWeek: 8,
        revenueChart: [
          { day: "1", amount: 4200000 }, { day: "5", amount: 5100000 }, 
          { day: "10", amount: 3800000 }, { day: "15", amount: 6200000 },
          { day: "20", amount: 5500000 }, { day: "25", amount: 7800000 },
          { day: "30", amount: 6900000 }
        ]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (error) {
      alert("Lỗi cập nhật trạng thái Lead");
    }
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f8f9fa] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Thống kê & Báo cáo 📊</h1>
            <p className="text-gray-500 font-medium">Theo dõi hiệu quả kinh doanh toàn hệ thống</p>
          </div>

          {isLoading ? (
            <div className="p-20 text-center animate-pulse text-gray-400 font-bold">Đang tổng hợp dữ liệu...</div>
          ) : (
            <div className="space-y-10">
              {/* METRIC CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Doanh thu hôm nay", val: `₫${stats.today.revenue.toLocaleString()}`, sub: `${stats.today.orders} đơn hàng`, color: "bg-blue-600" },
                  { label: "Doanh thu tháng này", val: `₫${stats.month.revenue.toLocaleString()}`, sub: "↑ 12% so với tháng trước", color: "bg-emerald-600" },
                  { label: "Đại lý mới tuần này", val: stats.newVendorsThisWeek, sub: "Tăng trưởng ổn định", color: "bg-orange-500" },
                  { label: "Sản phẩm bán chạy", val: stats.topProducts[0].name, sub: "Đang dẫn đầu doanh số", color: "bg-purple-600" }
                ].map((card, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">{card.label}</p>
                      <p className="text-2xl font-black text-gray-900 mb-1">{card.val}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className={`w-2 h-2 rounded-full ${card.color}`}></div>
                      <p className="text-xs text-gray-500 font-bold">{card.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* REVENUE CHART PLACEHOLDER */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="font-black text-gray-800 uppercase tracking-tight">Doanh thu 30 ngày gần nhất</h3>
                   <div className="flex gap-4 text-[10px] font-bold uppercase">
                      <span className="flex items-center gap-1"><i className="w-3 h-3 bg-blue-500 rounded-full"></i> Tháng này</span>
                      <span className="flex items-center gap-1 opacity-30"><i className="w-3 h-3 bg-gray-300 rounded-full"></i> Tháng trước</span>
                   </div>
                </div>
                <div className="h-48 flex items-end gap-2 md:gap-4 px-2">
                   {stats.revenueChart.map((d: any, i: number) => (
                     <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
                        <div 
                          className="w-full bg-blue-500 rounded-t-lg transition-all group-hover:bg-blue-600 relative"
                          style={{ height: `${(d.amount / 8000000) * 100}%` }}
                        >
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ₫{d.amount.toLocaleString()}
                           </div>
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold mt-2">Ngày {d.day}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* TOP PRODUCTS TABLE */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <h3 className="font-black text-gray-800 uppercase tracking-tight mb-8">Top Sản Phẩm Bán Chạy</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-50">
                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <th className="pb-4">Sản phẩm</th>
                          <th className="pb-4 text-center">Số đơn</th>
                          <th className="pb-4 text-right">Doanh thu</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {stats.topProducts.map((p: any, i: number) => (
                          <tr key={i} className="group">
                            <td className="py-4">
                               <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{p.name}</p>
                               <div className="w-full bg-gray-100 h-1 mt-1 rounded-full overflow-hidden">
                                  <div className="bg-blue-500 h-full" style={{ width: `${p.ratio * 3}%` }}></div>
                               </div>
                            </td>
                            <td className="py-4 text-center text-sm font-black text-gray-500">{p.sales}</td>
                            <td className="py-4 text-right text-sm font-black text-gray-900">₫{p.revenue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CONTACT LEADS LIST */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-gray-800 uppercase tracking-tight">Leads Từ Form Liên Hệ</h3>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                       {leads.filter(l => l.status !== 'Đã tư vấn').length} Mới
                    </span>
                  </div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {leads.length === 0 ? (
                      <p className="text-center py-10 text-gray-400 text-xs italic">Chưa có khách hàng liên hệ.</p>
                    ) : leads.map((lead, i) => (
                      <div key={i} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                             <h4 className="font-black text-gray-900 text-sm">{lead.name}</h4>
                             <p className="text-blue-600 font-bold text-xs">{lead.phone}</p>
                           </div>
                           <span className="text-[9px] text-gray-400 font-bold uppercase">{new Date(lead.createdAt).toLocaleDateString("vi-VN")}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-4 font-medium italic">"{lead.message || "Hỏi về kỹ thuật phân bón..."}"</p>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                           <select 
                             value={lead.status || "Chưa gọi"}
                             onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                             className={`text-[9px] font-black uppercase rounded-full px-3 py-1 outline-none border-none ${
                               lead.status === 'Đã tư vấn' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                             }`}
                           >
                             <option value="Chưa gọi">Chưa gọi</option>
                             <option value="Đã tư vấn">Đã tư vấn</option>
                           </select>
                           <a href={`tel:${lead.phone}`} className="text-blue-500 text-xs font-black hover:underline">GỌI NGAY</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
