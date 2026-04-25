"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminAgencies() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [pendingProducts, setPendingProducts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'agencies' | 'pending-products'>('agencies');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const vRes = await fetch(`${API_BASE_URL}/auth/vendors`, { headers: getAuthHeaders() });
      const vData = await vRes.json();
      setVendors(Array.isArray(vData) ? vData : []);

      const pRes = await fetch(`${API_BASE_URL}/products/admin/pending`, { headers: getAuthHeaders() });
      const pData = await pRes.json();
      setPendingProducts(Array.isArray(pData) ? pData : []);

      // Mock stats
      setStats({
        activeVendors: vData.filter((v: any) => v.vendorInfo?.isApproved).length,
        totalOrdersFromVendors: 450,
        commissionPending: 12500000
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleVendorStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/vendors/${id}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ isApproved: !currentStatus })
      });
      if (res.ok) fetchData();
    } catch (error) {
       alert("Lỗi cập nhật trạng thái đại lý");
    }
  };

  const approveProduct = async (id: string, approve: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}/approve`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ approved: approve })
      });
      if (res.ok) fetchData();
    } catch (error) {
       alert("Lỗi duyệt sản phẩm");
    }
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f8f9fa] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Quản lý Đại lý 🏪</h1>
              <p className="text-gray-500 font-medium">Đối tác phân phối và hệ thống gian hàng</p>
            </div>
            <div className="flex gap-4 mb-1">
               <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Đại lý hoạt động</p>
                  <p className="text-lg font-black text-[#1a5c2a]">{stats?.activeVendors || 0}</p>
               </div>
               <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Hoa hồng tháng này</p>
                  <p className="text-lg font-black text-orange-500">₫{stats?.commissionPending.toLocaleString() || 0}</p>
               </div>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-8 mb-8 border-b border-gray-200 px-4">
             <button 
               onClick={() => setActiveTab('agencies')}
               className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'agencies' ? 'text-[#1a5c2a]' : 'text-gray-400'}`}
             >
               Danh sách đại lý
               {activeTab === 'agencies' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a5c2a] rounded-t-full"></div>}
             </button>
             <button 
               onClick={() => setActiveTab('pending-products')}
               className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'pending-products' ? 'text-[#1a5c2a]' : 'text-gray-400'}`}
             >
               Sản phẩm chờ duyệt
               {pendingProducts.length > 0 && <span className="ml-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{pendingProducts.length}</span>}
               {activeTab === 'pending-products' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1a5c2a] rounded-t-full"></div>}
             </button>
          </div>

          {isLoading ? (
            <div className="p-20 text-center animate-pulse text-gray-400 font-bold">Đang tải dữ liệu...</div>
          ) : (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               {activeTab === 'agencies' ? (
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b border-gray-100">
                     <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <th className="px-8 py-5">Tên Cửa Hàng / Đại lý</th>
                       <th className="px-8 py-5">Số Điện Thoại</th>
                       <th className="px-8 py-5">Tỉnh/Thành</th>
                       <th className="px-8 py-5">Ngày tham gia</th>
                       <th className="px-8 py-5 text-right">Trạng thái / Hành động</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {vendors.map((v) => (
                       <tr key={v._id} className="hover:bg-gray-50/50 transition-colors group">
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-emerald-100 text-[#1a5c2a] rounded-xl flex items-center justify-center font-black text-lg shadow-inner">
                                  {v.vendorInfo?.storeName?.charAt(0) || "V"}
                               </div>
                               <span className="font-bold text-gray-800">{v.vendorInfo?.storeName || "Đại lý mới"}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-sm font-bold text-blue-600">{v.vendorInfo?.phone || "---"}</td>
                         <td className="px-8 py-6 text-sm text-gray-500 font-medium">{v.vendorInfo?.province || "---"}</td>
                         <td className="px-8 py-6 text-xs text-gray-400 font-bold uppercase">{new Date(v.createdAt).toLocaleDateString("vi-VN")}</td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => toggleVendorStatus(v._id, v.vendorInfo?.isApproved)}
                                 className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all ${
                                   v.vendorInfo?.isApproved ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100'
                                 }`}
                               >
                                 {v.vendorInfo?.isApproved ? 'TẠM KHÓA' : 'PHÊ DUYỆT'}
                               </button>
                               <button className="bg-gray-50 text-gray-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-gray-100">CHI TIẾT</button>
                            </div>
                            <span className={`text-[10px] font-black uppercase mt-1 inline-block group-hover:hidden ${
                              v.vendorInfo?.isApproved ? 'text-emerald-500' : 'text-red-500'
                            }`}>
                               {v.vendorInfo?.isApproved ? '● Đang hoạt động' : '○ Chờ duyệt'}
                            </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               ) : (
                 <table className="w-full text-left">
                   <thead className="bg-gray-50 border-b border-gray-100">
                     <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <th className="px-8 py-5">Ảnh</th>
                       <th className="px-8 py-5">Tên Sản Phẩm</th>
                       <th className="px-8 py-5">Đại Lý Gửi</th>
                       <th className="px-8 py-5">Giá Niêm Yết</th>
                       <th className="px-8 py-5 text-right">Hành động</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {pendingProducts.length === 0 ? (
                       <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 italic">Hiện không có sản phẩm nào chờ duyệt.</td></tr>
                     ) : pendingProducts.map((p) => (
                       <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-8 py-6">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                               {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl">📦</div>}
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <p className="font-bold text-gray-800">{p.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">{p.category}</p>
                         </td>
                         <td className="px-8 py-6 text-sm font-bold text-[#1a5c2a]">{p.shop_name || "N/A"}</td>
                         <td className="px-8 py-6 font-black text-gray-900">₫{p.price.toLocaleString()}</td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3">
                               <button onClick={() => approveProduct(p._id, true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-emerald-700 shadow-lg shadow-emerald-100">XUẤT BẢN</button>
                               <button onClick={() => approveProduct(p._id, false)} className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-red-100">TỪ CHỐI</button>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               )}
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
