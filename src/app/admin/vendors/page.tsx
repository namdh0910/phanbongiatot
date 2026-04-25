"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminVendors() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/sellers/applications`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
    if (status === 'rejected' && !rejectionReason.trim()) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/sellers/applications/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, reason: rejectionReason })
      });
      
      if (res.ok) {
        fetchApplications();
        setSelectedApp(null);
        setRejectionReason("");
        alert(status === 'approved' ? "Đã duyệt đơn đăng ký!" : "Đã từ chối đơn đăng ký");
      } else {
        alert("Cập nhật thất bại");
      }
    } catch (error) {
      alert("Lỗi kết nối");
    }
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
               <h1 className="text-2xl font-black text-gray-800 tracking-tight">Duyệt Đăng Ký Seller</h1>
               <p className="text-sm text-gray-500 font-medium">Xét duyệt hồ sơ các đối tác muốn bán hàng trên sàn</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 text-center">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Đang chờ</p>
              <p className="text-xl font-black text-blue-800">{applications.filter(a => a.status === 'pending').length}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/40">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/30 border-b border-gray-100">
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Người đăng ký</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Cửa hàng / Địa chỉ</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Loại hình</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Trạng thái</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-20 text-center">Đang tải dữ liệu...</td></tr>
                ) : applications.length === 0 ? (
                  <tr><td colSpan={5} className="p-20 text-center text-gray-400 font-bold">Chưa có đơn đăng ký nào</td></tr>
                ) : applications.map(app => (
                  <tr key={app._id} className="hover:bg-blue-50/40 transition-all group">
                    <td className="p-6">
                      <p className="font-black text-gray-900">{app.fullName}</p>
                      <p className="text-[#1a5c2a] font-bold">{app.phone}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(app.createdAt).toLocaleString("vi-VN")}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-gray-800">{app.storeName}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{app.province} - {app.address}</p>
                    </td>
                    <td className="p-6">
                      <span className="bg-gray-100 px-2 py-1 rounded text-[11px] font-bold text-gray-600 uppercase">{app.businessType}</span>
                      <p className="text-[10px] text-gray-400 mt-1">KN: {app.yearsInBusiness}</p>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {app.status === 'pending' ? 'Chờ duyệt' : app.status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="bg-[#1a5c2a] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:bg-[#2d7a3e]"
                      >
                        Xem hồ sơ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal Hồ sơ đăng ký */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-xl font-black text-gray-900">Hồ sơ Seller: <span className="text-[#1a5c2a]">{selectedApp.storeName}</span></h2>
                <p className="text-xs text-gray-500 mt-1">Đăng ký ngày: {new Date(selectedApp.createdAt).toLocaleString("vi-VN")}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">✕</button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 bg-gray-50/10">
              <div className="grid grid-cols-2 gap-8 mb-8">
                 <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Chủ cửa hàng</h3>
                   <p className="font-black text-gray-900 text-lg">{selectedApp.fullName}</p>
                   <p className="text-sm text-[#1a5c2a] font-black">{selectedApp.phone}</p>
                   <p className="text-sm text-gray-500">{selectedApp.email}</p>
                 </div>
                 <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Loại hình kinh doanh</h3>
                   <p className="font-bold text-gray-800">{selectedApp.businessType}</p>
                   <p className="text-sm text-gray-500">Kinh nghiệm: {selectedApp.yearsInBusiness}</p>
                 </div>
              </div>

              <div className="mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Địa chỉ kinh doanh</h3>
                <p className="font-bold text-gray-800">{selectedApp.address}, {selectedApp.province}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Sản phẩm quan tâm</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                   {selectedApp.interests?.map((i: string) => (
                     <span key={i} className="px-3 py-1 bg-green-50 text-[#1a5c2a] rounded-full text-xs font-bold border border-green-100">{i}</span>
                   ))}
                </div>
              </div>

              {selectedApp.status === 'pending' && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                  <h3 className="font-black text-sm text-gray-900">Xử lý hồ sơ</h3>
                  <textarea 
                    placeholder="Lý do từ chối (nếu có)..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-red-400 h-24 resize-none"
                  />
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleUpdateStatus(selectedApp._id, 'approved')}
                      className="flex-1 bg-[#1a5c2a] text-white py-3 rounded-xl font-black shadow-lg hover:bg-[#2d7a3e] transition-all"
                    >
                      Duyệt ngay
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedApp._id, 'rejected')}
                      className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-black border border-red-100 hover:bg-red-600 hover:text-white transition-all"
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              )}

              {selectedApp.status !== 'pending' && (
                <div className={`p-6 rounded-2xl border ${selectedApp.status === 'approved' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                  <p className={`font-black uppercase text-xs mb-1 ${selectedApp.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                    Kết quả: {selectedApp.status === 'approved' ? 'Đã duyệt' : 'Đã từ chối'}
                  </p>
                  {selectedApp.rejectionReason && <p className="text-sm text-red-800 font-medium">Lý do: {selectedApp.rejectionReason}</p>}
                  <p className="text-[10px] text-gray-400 mt-3 italic">Xử lý vào: {new Date(selectedApp.reviewedAt).toLocaleString("vi-VN")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}
