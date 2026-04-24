"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function AdminVendors() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

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
      setVendors(data);
    } catch (err) {
      console.error(err);
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
      if (res.ok) fetchVendors();
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">QUẢN LÝ ĐỐI TÁC 🏪</h1>
        <p className="text-gray-500">Danh sách các đại lý đã đăng ký mở gian hàng trên hệ thống.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Gian hàng</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Liên hệ</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Ngày đăng ký</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Đang tải dữ liệu đối tác...</td></tr>
            ) : vendors.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Chưa có đối tác nào đăng ký.</td></tr>
            ) : vendors.map((vendor) => (
              <tr key={vendor._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {vendor.vendorInfo?.storeName?.charAt(0) || "V"}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{vendor.vendorInfo?.storeName}</div>
                      <div className="text-[10px] text-gray-400 font-medium">@{vendor.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 font-medium">{vendor.vendorInfo?.phone}</div>
                  <div className="text-[10px] text-gray-400">{vendor.vendorInfo?.address}</div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                  {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString("vi-VN") : "---"}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    vendor.vendorInfo?.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {vendor.vendorInfo?.isApproved ? 'Đã kích hoạt' : 'Chờ duyệt'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => toggleApproval(vendor._id, vendor.vendorInfo?.isApproved)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      vendor.vendorInfo?.isApproved 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {vendor.vendorInfo?.isApproved ? 'Khóa Shop' : 'Duyệt Shop'}
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
