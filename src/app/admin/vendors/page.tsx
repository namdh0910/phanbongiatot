"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function AdminVendors() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");

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
      const data = await res.json();
      if (Array.isArray(data)) {
        setVendors(data);
      } else {
        setVendors([]);
      }
    } catch (err) {
      console.error(err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    const token = localStorage.getItem("adminToken");
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
        setMessage(currentStatus ? "Đã khóa gian hàng!" : "Đã duyệt gian hàng thành công!");
        setTimeout(() => setMessage(""), 3000);
        fetchVendors();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Quản lý Đối tác 🏪</h1>
          <p className="text-gray-500">Danh sách các đại lý đã đăng ký mở gian hàng.</p>
        </div>
        {message && (
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold animate-bounce shadow-lg">
            {message}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Thông tin Đại lý</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={3} className="px-8 py-16 text-center text-gray-400 font-medium">Đang tải dữ liệu...</td></tr>
            ) : vendors.length === 0 ? (
              <tr><td colSpan={3} className="px-8 py-16 text-center text-gray-400">Chưa có đối tác nào.</td></tr>
            ) : vendors.map((vendor) => (
              <tr key={vendor._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xl shadow-inner">
                      {vendor.vendorInfo?.storeName?.charAt(0) || "V"}
                    </div>
                    <div>
                      <div className="font-black text-lg text-gray-800 leading-tight mb-1">{vendor.vendorInfo?.storeName || "Gian hàng mới"}</div>
                      <div className="space-y-1">
                        <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">📞 {vendor.vendorInfo?.phone || "---"}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">📍 {vendor.vendorInfo?.address || "Chưa cập nhật địa chỉ"}</div>
                        {vendor.vendorInfo?.description && (
                          <div className="text-[11px] text-gray-400 italic max-w-md mt-2 bg-gray-50 p-2 rounded-lg border border-dashed border-gray-200">
                            "{vendor.vendorInfo.description}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    vendor.vendorInfo?.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700 shadow-sm'
                  }`}>
                    {vendor.vendorInfo?.isApproved ? 'Đã duyệt ✅' : 'Chờ duyệt ⏳'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => toggleApproval(vendor._id, vendor.vendorInfo?.isApproved)}
                    className={`px-6 py-3 rounded-2xl text-xs font-black transition-all shadow-sm active:scale-95 ${
                      vendor.vendorInfo?.isApproved 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 shadow-lg'
                    }`}
                  >
                    {vendor.vendorInfo?.isApproved ? 'KHÓA SHOP' : 'DUYỆT NGAY'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
