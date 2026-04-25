"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminFlashSales() {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    salePrice: 0,
    startAt: "",
    endAt: "",
    maxQty: 0
  });

  const fetchData = async () => {
    try {
      const [salesRes, prodRes] = await Promise.all([
        fetch(`${API_BASE_URL}/flash-sales`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/products/admin/all`, { headers: getAuthHeaders() })
      ]);
      if (salesRes.ok) setSales(await salesRes.json());
      if (prodRes.ok) setProducts(await prodRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/flash-sales`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowForm(false);
        fetchData();
      }
    } catch (err) {
      alert("Lỗi khi tạo flash sale");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa deal này?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/flash-sales/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert("Xóa thất bại");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Quản lý Flash Sale</h1>
          <button onClick={() => setShowForm(true)} className="bg-[#2271b1] text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#135e96] transition-all shadow-md">
             + Tạo Deal Mới
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Thiết lập Deal Hot</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Sản phẩm</label>
                      <select 
                        required 
                        className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-sm font-bold"
                        value={formData.product}
                        onChange={e => setFormData({...formData, product: e.target.value})}
                      >
                         <option value="">-- Chọn sản phẩm --</option>
                         {products.map(p => <option key={p._id} value={p._id}>{p.name} (Gốc: {p.price.toLocaleString()}đ)</option>)}
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Giá Sale (VNĐ)</label>
                      <input 
                        type="number" required 
                        className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-sm font-bold"
                        value={formData.salePrice}
                        onChange={e => setFormData({...formData, salePrice: Number(e.target.value)})}
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Bắt đầu</label>
                         <input 
                           type="datetime-local" required 
                           className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-xs font-bold"
                           value={formData.startAt}
                           onChange={e => setFormData({...formData, startAt: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Kết thúc</label>
                         <input 
                           type="datetime-local" required 
                           className="w-full border-2 border-gray-50 rounded-xl px-4 py-2 text-xs font-bold"
                           value={formData.endAt}
                           onChange={e => setFormData({...formData, endAt: e.target.value})}
                         />
                      </div>
                   </div>
                   <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 text-sm font-black text-gray-400">HỦY</button>
                      <button type="submit" className="flex-1 bg-[#1a5c2a] text-white px-6 py-3 rounded-xl font-black text-sm uppercase">TẠO DEAL</button>
                   </div>
                </form>
             </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Giá Deal</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-20 text-gray-400 font-bold italic">Đang tải...</td></tr>
              ) : sales.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-20 text-gray-400 font-bold italic">Chưa có deal nào</td></tr>
              ) : sales.map((sale) => {
                const now = new Date();
                const start = new Date(sale.startAt);
                const end = new Date(sale.endAt);
                const isRunning = now >= start && now <= end;
                const isUpcoming = now < start;
                const isEnded = now > end;

                return (
                  <tr key={sale._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-gray-900 line-clamp-1">{sale.product?.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Giá gốc: {sale.product?.price?.toLocaleString()}đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-[#ee4d2d]">₫{sale.salePrice.toLocaleString()}</p>
                      <p className="text-[9px] font-black bg-red-50 text-red-600 px-1.5 py-0.5 rounded inline-block uppercase mt-1">
                        -{Math.round((1 - sale.salePrice / (sale.product?.price || 1)) * 100)}%
                      </p>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-gray-400 font-black uppercase leading-relaxed">
                      Bắt đầu: {start.toLocaleString("vi-VN")}<br/>
                      Kết thúc: {end.toLocaleString("vi-VN")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${
                        isRunning ? 'bg-green-100 text-green-700 animate-pulse' :
                        isUpcoming ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {isRunning ? 'Đang diễn ra' : isUpcoming ? 'Sắp diễn ra' : 'Đã kết thúc'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(sale._id)} className="text-gray-400 hover:text-red-500 p-2">🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
