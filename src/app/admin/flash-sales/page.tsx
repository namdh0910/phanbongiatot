"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminFlashSales() {
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
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
    setFormError("");

    // C1: salePrice phải > 0
    if (!formData.salePrice || formData.salePrice <= 0) {
      setFormError("Giá sale phải lớn hơn 0đ!");
      return;
    }
    // C2: salePrice phải < giá gốc
    const selectedProduct = products.find(p => p._id === formData.product);
    if (selectedProduct && formData.salePrice >= selectedProduct.price) {
      setFormError(`Giá sale (${formData.salePrice.toLocaleString()}đ) phải nhỏ hơn giá gốc (${selectedProduct.price.toLocaleString()}đ)!`);
      return;
    }
    // H2: Tối đa 48 tiếng
    if (formData.startAt && formData.endAt) {
      const durationHours = (new Date(formData.endAt).getTime() - new Date(formData.startAt).getTime()) / 3600000;
      if (durationHours > 48) {
        setFormError("Flash Sale không nên kéo dài quá 48 tiếng để tạo cảm giác cấp bách!");
        return;
      }
      if (durationHours <= 0) {
        setFormError("Giờ kết thúc phải sau giờ bắt đầu!");
        return;
      }
    }

    try {
      const payload = {
        ...formData,
        startAt: new Date(formData.startAt).toISOString(),
        endAt: new Date(formData.endAt).toISOString()
      };
      
      const url = editId ? `${API_BASE_URL}/flash-sales/${editId}` : `${API_BASE_URL}/flash-sales`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowForm(false);
        setEditId(null);
        setFormError("");
        setFormData({ product: '', salePrice: 0, startAt: '', endAt: '', maxQty: 0 });
        fetchData();
      } else {
        const errData = await res.json().catch(() => ({}));
        setFormError(errData.message || "Lỗi khi tạo flash sale");
      }
    } catch (err) {
      setFormError("Không kết nối được server. Thử lại!");
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

  const handleEdit = (sale: any) => {
    // Format date for datetime-local input (YYYY-MM-DDThh:mm)
    const formatForInput = (isoString: string) => {
      const d = new Date(isoString);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    };

    setFormData({
      product: sale.product?._id || "",
      salePrice: sale.salePrice,
      startAt: formatForInput(sale.startAt),
      endAt: formatForInput(sale.endAt),
      maxQty: sale.maxQty || 0
    });
    setEditId(sale._id);
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Quản lý Flash Sale</h1>
          <button onClick={() => setShowForm(true)} className="bg-[#1a5c2a] text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#0f3d1b] transition-all shadow-md">
             + Tạo Deal Mới
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
             <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                  {editId ? "Chỉnh sửa Deal Hot ⚡" : "Thiết lập Deal Hot ⚡"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                   {formError && (
                     <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold px-4 py-3 rounded-xl flex items-start gap-2">
                       <span>⚠️</span> {formError}
                     </div>
                   )}
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Sản phẩm</label>
                      <select
                        required
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-bold"
                        value={formData.product}
                        onChange={e => setFormData({...formData, product: e.target.value})}
                      >
                         <option value="">-- Chọn sản phẩm --</option>
                         {products.map(p => (
                           <option key={p._id} value={p._id}>{p.name} (Gốc: {p.price?.toLocaleString()}đ)</option>
                         ))}
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">
                        Giá Sale (VNĐ) — <span className="text-red-500 normal-case">phải &gt; 0 và &lt; giá gốc</span>
                      </label>
                      <input
                        type="number" required min={1}
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-bold"
                        value={formData.salePrice || ''}
                        placeholder="VD: 200000"
                        onChange={e => setFormData({...formData, salePrice: Number(e.target.value)})}
                      />
                      {formData.salePrice > 0 && formData.product && (() => {
                        const sp = products.find(p => p._id === formData.product);
                        const pct = sp ? Math.round((1 - formData.salePrice / sp.price) * 100) : 0;
                        return pct > 0 ? (
                          <p className="text-green-600 text-xs font-bold mt-1">✅ Giảm {pct}% so với giá gốc</p>
                        ) : pct <= 0 && sp ? (
                          <p className="text-red-500 text-xs font-bold mt-1">❌ Giá sale phải nhỏ hơn giá gốc</p>
                        ) : null;
                      })()}
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Bắt đầu</label>
                         <input
                           type="datetime-local" required
                           className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 text-xs font-bold"
                           value={formData.startAt}
                           onChange={e => setFormData({...formData, startAt: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">
                           Kết thúc <span className="text-gray-300 normal-case">(≤48h)</span>
                         </label>
                         <input
                           type="datetime-local" required
                           className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 text-xs font-bold"
                           value={formData.endAt}
                           onChange={e => setFormData({...formData, endAt: e.target.value})}
                         />
                      </div>
                   </div>
                   <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => { setShowForm(false); setEditId(null); setFormError(''); }} className="flex-1 px-6 py-3 text-sm font-black text-gray-400">HỦY</button>
                      <button type="submit" className="flex-1 bg-[#1a5c2a] text-white px-6 py-3 rounded-xl font-black text-sm uppercase">
                        {editId ? "CẬP NHẬT ⚡" : "TẠO DEAL ⚡"}
                      </button>
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
                <tr><td colSpan={5} className="text-center py-20 text-gray-400 font-bold italic">Chưa có deal nào. Tạo deal đầu tiên ngay!</td></tr>
              ) : sales.map((sale) => {
                const now = new Date();
                const start = new Date(sale.startAt);
                const end = new Date(sale.endAt);
                const isRunning = now >= start && now <= end;
                const isUpcoming = now < start;

                const discountPct = sale.product?.price
                  ? Math.round((1 - sale.salePrice / sale.product.price) * 100)
                  : 0;

                return (
                  <tr key={sale._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-gray-900 line-clamp-1">{sale.product?.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Giá gốc: {sale.product?.price?.toLocaleString()}đ</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-[#1a5c2a]">₫{sale.salePrice?.toLocaleString()}</p>
                      {discountPct > 0 && (
                        <p className="text-[9px] font-black bg-green-50 text-green-700 px-1.5 py-0.5 rounded inline-block uppercase mt-1">
                          -{discountPct}%
                        </p>
                      )}
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
                        {isRunning ? '🟢 Đang diễn ra' : isUpcoming ? '🔵 Sắp diễn ra' : '⚫ Đã kết thúc'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button onClick={() => handleEdit(sale)} className="text-gray-400 hover:text-blue-500 p-2 transition-colors">✏️</button>
                      <button onClick={() => handleDelete(sale._id)} className="text-gray-400 hover:text-red-500 p-2 transition-colors">🗑️</button>
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
