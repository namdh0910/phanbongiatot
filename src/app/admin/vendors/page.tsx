"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function AdminVendors() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    setMounted(true);
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/vendors`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) {
        if (res.status === 403) throw new Error("Bạn không có quyền Admin (403)");
        throw new Error(`Lỗi server: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setVendors(data);
      } else {
        setVendors([]);
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ text: err.message, type: "error" });
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    const token = localStorage.getItem("adminToken");
    setMessage({ text: "Đang xử lý...", type: "info" });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/vendors/${id}/approve`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ isApproved: !currentStatus })
      });
      if (res.ok) {
        setMessage({ 
          text: currentStatus ? "Đã khóa gian hàng!" : "Đã kích hoạt gian hàng thành công!", 
          type: "success" 
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        fetchVendors();
      } else {
        const errorData = await res.json();
        setMessage({ text: `Lỗi: ${errorData.message || res.statusText}`, type: "error" });
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ text: `Lỗi kết nối: ${err.message}`, type: "error" });
    }
  };

  const extendVendor = async (id: string, days: number) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/vendors/${id}/extend`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ days })
      });
      if (res.ok) {
        setMessage({ text: `Đã gia hạn thêm ${days} ngày!`, type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        fetchVendors();
      } else {
        setMessage({ text: "Lỗi khi gia hạn", type: "error" });
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ text: "Lỗi kết nối", type: "error" });
    }
  };

  const getTrialDays = (expiry: string) => {
    const now = new Date();
    const exp = new Date(expiry);
    const diffTime = exp.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!mounted) return null;

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Quản lý Đối tác & Gói cước 🏪</h1>
          <p className="text-gray-500">Duyệt shop và quản lý thời hạn dùng thử/gói cước đại lý.</p>
        </div>
        {message.text && (
          <div className={`${
            message.type === 'success' ? 'bg-emerald-500' : 
            message.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          } text-white px-6 py-3 rounded-2xl font-bold animate-bounce shadow-lg flex items-center gap-2`}>
            {message.type === 'error' && <span>⚠️</span>}
            {message.text}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Đại lý</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Thời hạn</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={3} className="px-8 py-16 text-center text-gray-400 font-medium">Đang tải dữ liệu...</td></tr>
            ) : vendors.length === 0 ? (
              <tr><td colSpan={3} className="px-8 py-16 text-center text-gray-400">Chưa có đối tác nào.</td></tr>
            ) : vendors.map((vendor) => {
              const trialDays = getTrialDays(vendor.vendorInfo?.trialExpiresAt);
              const isExpired = trialDays <= 0;

              return (
                <tr key={vendor._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                        vendor.vendorInfo?.isApproved ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {vendor.vendorInfo?.storeName?.charAt(0) || "V"}
                      </div>
                      <div>
                        <div className="font-black text-lg text-gray-800 leading-tight mb-1">{vendor.vendorInfo?.storeName || "Gian hàng mới"}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">📞 {vendor.vendorInfo?.phone || "---"}</div>
                        <div className="flex gap-2">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                             vendor.vendorInfo?.isApproved ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                           }`}>
                             {vendor.vendorInfo?.isApproved ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                           </span>
                           <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                             Gói: {vendor.vendorInfo?.plan || 'Trial'}
                           </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className={`text-xl font-black ${isExpired ? 'text-red-500' : 'text-emerald-600'}`}>
                      {isExpired ? 'HẾT HẠN' : `${trialDays} ngày`}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                      Hết hạn: {new Date(vendor.vendorInfo?.trialExpiresAt).toLocaleDateString("vi-VN")}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col gap-2 items-end">
                      <button 
                        onClick={() => toggleApproval(vendor._id, vendor.vendorInfo?.isApproved)}
                        className={`w-40 py-3 rounded-xl text-[10px] font-black transition-all shadow-sm ${
                          vendor.vendorInfo?.isApproved 
                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                        }`}
                      >
                        {vendor.vendorInfo?.isApproved ? 'KHÓA GIAN HÀNG' : 'KÍCH HOẠT SHOP'}
                      </button>
                      <div className="flex gap-1">
                        <button onClick={() => extendVendor(vendor._id, 30)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[9px] font-black hover:bg-blue-700 shadow-sm">+30 ngày</button>
                        <button onClick={() => extendVendor(vendor._id, 365)} className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-[9px] font-black hover:bg-purple-700 shadow-sm">+1 năm</button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
