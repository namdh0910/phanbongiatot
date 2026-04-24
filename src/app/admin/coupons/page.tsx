"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

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
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Mã Giảm Giá (Coupons)</h1>
          <p className="text-gray-500">Quản lý các chương trình khuyến mãi cho khách hàng</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg"
        >
          + Tạo mã mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Mã CODE</th>
                <th className="px-6 py-4">Loại giảm</th>
                <th className="px-6 py-4">Giá trị</th>
                <th className="px-6 py-4">Đơn tối thiểu</th>
                <th className="px-6 py-4">Ngày hết hạn</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-black text-gray-900">{coupon.code}</td>
                  <td className="px-6 py-4 text-sm">
                    {coupon.discountType === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định'}
                  </td>
                  <td className="px-6 py-4 font-bold text-primary">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `${coupon.discountValue.toLocaleString()}đ`}
                  </td>
                  <td className="px-6 py-4 text-sm">{coupon.minOrderAmount.toLocaleString()}đ</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(coupon.expiryDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    {new Date() > new Date(coupon.expiryDate) ? (
                      <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase">Hết hạn</span>
                    ) : (
                      <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-[10px] font-bold uppercase">Đang chạy</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(coupon._id)} className="text-red-400 hover:text-red-600 font-bold text-xs uppercase">Xóa</button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-gray-400 italic">Chưa có mã giảm giá nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal tạo mã */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Tạo Mã Giảm Giá Mới</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mã CODE (viết liền, không dấu)</label>
                <input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" placeholder="Vd: GIAM10, TET2026..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Loại giảm giá</label>
                  <select value={formData.discountType} onChange={e => setFormData({...formData, discountType: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary">
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (đ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Giá trị giảm</label>
                  <input type="number" required value={formData.discountValue} onChange={e => setFormData({...formData, discountValue: Number(e.target.value)})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Đơn tối thiểu (đ)</label>
                  <input type="number" required value={formData.minOrderAmount} onChange={e => setFormData({...formData, minOrderAmount: Number(e.target.value)})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Ngày hết hạn</label>
                  <input type="date" required value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-sm font-bold text-gray-400 hover:text-gray-600">Hủy</button>
                <button type="submit" className="bg-primary text-white px-10 py-3 rounded-xl font-black text-sm shadow-lg shadow-green-100 hover:bg-primary-hover transition-all">TẠO MÃ NGAY</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
