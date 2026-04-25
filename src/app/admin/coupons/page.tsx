"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderAmount: 0,
    expiryDate: "",
    maxUsage: 100
  });

  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/coupons`, {
        headers: getAuthHeaders()
      });
      if (res.ok) setCoupons(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/coupons`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowForm(false);
        fetchCoupons();
      }
    } catch (err) {
      alert("Lỗi khi tạo mã giảm giá");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa mã này?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/coupons/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) fetchCoupons();
    } catch (err) {
      alert("Xóa thất bại");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Quản lý Mã giảm giá</h1>
          <button onClick={() => setShowForm(true)} className="bg-[#2271b1] text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#135e96] transition-all shadow-md">
             + Tạo Mã Mới
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Thiết lập Mã giảm giá</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Mã Code (In hoa)</label>
                      <input 
                        required 
                        className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-sm font-black uppercase"
                        value={formData.code}
                        onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                        placeholder="Vd: CHAOXUAN50"
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Loại</label>
                         <select 
                           className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-xs font-bold"
                           value={formData.discountType}
                           onChange={e => setFormData({...formData, discountType: e.target.value})}
                         >
                            <option value="percentage">Phần trăm (%)</option>
                            <option value="fixed">Số tiền cố định (đ)</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Giá trị</label>
                         <input 
                           type="number" required 
                           className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-sm font-bold"
                           value={formData.discountValue}
                           onChange={e => setFormData({...formData, discountValue: Number(e.target.value)})}
                         />
                      </div>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Đơn hàng tối thiểu (VNĐ)</label>
                      <input 
                        type="number" 
                        className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-sm font-bold"
                        value={formData.minOrderAmount}
                        onChange={e => setFormData({...formData, minOrderAmount: Number(e.target.value)})}
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Hết hạn</label>
                         <input 
                           type="date" required 
                           className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-xs font-bold"
                           value={formData.expiryDate}
                           onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Lượt dùng tối đa</label>
                         <input 
                           type="number" required 
                           className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-sm font-bold"
                           value={formData.maxUsage}
                           onChange={e => setFormData({...formData, maxUsage: Number(e.target.value)})}
                         />
                      </div>
                   </div>
                   <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 text-sm font-black text-gray-400">HỦY</button>
                      <button type="submit" className="flex-1 bg-[#1a5c2a] text-white px-6 py-3 rounded-xl font-black text-sm uppercase">TẠO MÃ</button>
                   </div>
                </form>
             </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4">Mã / Giá trị</th>
                <th className="px-6 py-4">Điều kiện</th>
                <th className="px-6 py-4">Sử dụng</th>
                <th className="px-6 py-4">Hết hạn</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-20 text-gray-400 font-bold italic">Đang tải...</td></tr>
              ) : coupons.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-20 text-gray-400 font-bold italic">Chưa có mã giảm giá nào</td></tr>
              ) : coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-[#1a5c2a] tracking-widest">{coupon.code}</p>
                    <p className="text-xs font-bold text-gray-400">
                      Giảm {coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : 'đ'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Đơn tối thiểu: {coupon.minOrderAmount.toLocaleString()}đ</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[100px] bg-gray-100 h-2 rounded-full overflow-hidden mb-1">
                       <div className="bg-emerald-500 h-full" style={{ width: `${(coupon.usageCount/coupon.maxUsage)*100}%` }}></div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">{coupon.usageCount} / {coupon.maxUsage} lượt</p>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-gray-400 font-black uppercase">
                    {new Date(coupon.expiryDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(coupon._id)} className="text-gray-400 hover:text-red-500 p-2">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
