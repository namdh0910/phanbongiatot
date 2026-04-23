"use client";
import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalBlogs: 0,
    totalLeads: 0,
    recentLeads: [] as any[],
    revenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` };
        
        const [prodRes, blogRes, leadRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products`),
          fetch(`${API_BASE_URL}/blogs`),
          fetch(`${API_BASE_URL}/leads`, { headers })
        ]);

        const prods = await prodRes.json();
        const blogs = await blogRes.json();
        const leads = await leadRes.json();

        const totalRevenue = leads.reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);

        setStats({
          totalProducts: prods.length,
          totalBlogs: blogs.length,
          totalLeads: leads.length,
          recentLeads: leads.slice(0, 5),
          revenue: totalRevenue
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Thống kê & Tổng quan</h1>
            <div className="text-xs text-gray-400">Dữ liệu cập nhật: {new Date().toLocaleDateString("vi-VN")}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
             {/* Stat Card 1 */}
             <div className="bg-white p-6 border-l-4 border-blue-500 shadow-sm rounded-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Tổng doanh thu</p>
                <h3 className="text-2xl font-black text-gray-900">{stats.revenue.toLocaleString()}đ</h3>
             </div>
             {/* Stat Card 2 */}
             <div className="bg-white p-6 border-l-4 border-emerald-500 shadow-sm rounded-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Đơn hàng mới</p>
                <h3 className="text-2xl font-black text-gray-900">{stats.totalLeads}</h3>
             </div>
             {/* Stat Card 3 */}
             <div className="bg-white p-6 border-l-4 border-orange-500 shadow-sm rounded-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Sản phẩm</p>
                <h3 className="text-2xl font-black text-gray-900">{stats.totalProducts}</h3>
             </div>
             {/* Stat Card 4 */}
             <div className="bg-white p-6 border-l-4 border-purple-500 shadow-sm rounded-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Bài viết SEO</p>
                <h3 className="text-2xl font-black text-gray-900">{stats.totalBlogs}</h3>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Recent Orders List */}
             <div className="lg:col-span-2 bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
                <div className="bg-[#f6f7f7] p-4 border-b border-gray-200">
                   <h2 className="font-bold text-gray-700 text-sm">Đơn hàng gần đây</h2>
                </div>
                <div className="p-0">
                   <table className="w-full text-left text-xs">
                      <thead>
                         <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 font-bold text-gray-500">Khách hàng</th>
                            <th className="p-4 font-bold text-gray-500">Ngày</th>
                            <th className="p-4 font-bold text-gray-500 text-right">Tổng tiền</th>
                         </tr>
                      </thead>
                      <tbody>
                         {stats.recentLeads.map((lead, i) => (
                           <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="p-4">
                                 <p className="font-bold text-blue-600">{lead.name}</p>
                                 <p className="text-gray-400">{lead.phone}</p>
                              </td>
                              <td className="p-4 text-gray-500">{new Date(lead.createdAt).toLocaleDateString("vi-VN")}</td>
                              <td className="p-4 text-right font-bold text-red-600">{(lead.totalAmount || 0).toLocaleString()}đ</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                   <a href="/admin/leads" className="text-xs font-bold text-blue-600 hover:underline">Xem tất cả đơn hàng →</a>
                </div>
             </div>

             {/* Quick Actions / Tips */}
             <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6">
                   <h3 className="font-bold text-gray-700 text-sm mb-4 border-b border-gray-100 pb-2">Hành động nhanh</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <a href="/admin" className="flex flex-col items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                         <span className="text-2xl">📦</span>
                         <span className="text-[10px] font-bold mt-2 uppercase">SP Mới</span>
                      </a>
                      <a href="/admin/blog" className="flex flex-col items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                         <span className="text-2xl">📝</span>
                         <span className="text-[10px] font-bold mt-2 uppercase">Viết Bài</span>
                      </a>
                   </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-green-800 rounded-sm shadow-lg p-6 text-white">
                   <h3 className="font-black text-sm mb-2 italic">Mẹo bán hàng cho anh:</h3>
                   <p className="text-xs leading-relaxed opacity-90">
                     "Đợt này bà con miền Tây đang chuẩn bị làm bông sầu riêng, anh nên viết 2-3 bài chia sẻ kinh nghiệm xử lý đọt và kích bông để kéo thêm khách nhé!"
                   </p>
                </div>
             </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
