"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 0,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    maxUsage: 1000
  });

  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/coupons`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách coupon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/coupons`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchCoupons();
        alert("Đã tạo mã giảm giá mới!");
      } else {
        const err = await res.json();
        alert(err.message || "Lỗi khi tạo coupon");
      }
    } catch (error) {
      alert("Lỗi kết nối server");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/coupons/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (res.ok) {
        fetchCoupons();
      }
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div className="flex bg-[#f0f0f1] min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Mã giảm giá</h1>
            <p className="text-xs text-gray-500">Quản lý các chương trình khuyến mãi</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#2271b1] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#135e96] transition-all"
          >
            + Tạo mã mới
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin text-4xl">⏳</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f6f7f7] text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Mã CODE</th>
                  <th className="px-6 py-4">Loại giảm</th>
                  <th className="px-6 py-4">Giá trị</th>
                  <th className="px-6 py-4">Đơn tối thiểu</th>
                  <th className="px-6 py-4">Hết hạn</th>
                  <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-black">{coupon.code}</td>
                    <td className="px-6 py-4">{coupon.discountType === 'percentage' ? 'Phần trăm' : 'Tiền mặt'}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `${coupon.discountValue.toLocaleString()}đ`}
                    </td>
                    <td className="px-6 py-4">{coupon.minOrderAmount.toLocaleString()}đ</td>
                    <td className="px-6 py-4 text-xs text-gray-500">{new Date(coupon.expiryDate).toLocaleDateString("vi-VN")}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(coupon._id)} className="text-[#d63638] font-bold text-xs hover:underline">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Tạo mã mới</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mã Code</label>
                  <input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:border-[#2271b1]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Loại</label>
                    <select value={formData.discountType} onChange={e => setFormData({...formData, discountType: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 outline-none">
                      <option value="percentage">Phần trăm (%)</option>
                      <option value="fixed">Tiền mặt (đ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Giá trị</label>
                    <input type="number" required value={formData.discountValue} onChange={e => setFormData({...formData, discountValue: Number(e.target.value)})} className="w-full border border-gray-300 rounded px-4 py-2 outline-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-500 hover:underline">Hủy</button>
                  <button type="submit" className="bg-[#2271b1] text-white px-6 py-2 rounded font-bold hover:bg-[#135e96]">Tạo mã</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
