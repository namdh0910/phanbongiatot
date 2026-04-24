"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";

export default function NewVendorProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Phân bón",
    price: "",
    originalPrice: "",
    description: "",
    benefits: "",
    usageInstructions: "",
    dosage: "",
    images: [] as string[],
    stock: 100,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("vendorToken");
    const productData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      benefits: formData.benefits.split("\n").filter(b => b.trim()),
      slug: formData.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Math.random().toString(36).substring(7)
    };

    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        alert("Sản phẩm đã được gửi và đang chờ duyệt!");
        router.push("/kenh-nguoi-ban/products");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Thêm Sản Phẩm Mới</h1>
        <p className="text-gray-500">Sản phẩm sẽ được hiển thị sau khi Ban quản trị phê duyệt.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tên sản phẩm</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none" placeholder="Ví dụ: Phân bón lá siêu to trái..." />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Danh mục</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none bg-white">
              <option>Phân bón</option>
              <option>Thuốc trừ sâu</option>
              <option>Kích rễ</option>
              <option>Tuyến trùng</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Giá bán (₫)</label>
            <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none" placeholder="Ví dụ: 150000" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Giá gốc (nếu có giảm giá)</label>
            <input type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none" placeholder="Ví dụ: 200000" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Link hình ảnh (Tạm thời nhập URL)</label>
          <input value={formData.images[0] || ""} onChange={e => setFormData({...formData, images: [e.target.value]})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none" placeholder="Dán link ảnh từ google hoặc website khác..." />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mô tả sản phẩm</label>
          <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none h-32 resize-none" placeholder="Nhập mô tả chi tiết..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Lợi ích sản phẩm (Mỗi dòng 1 lợi ích)</label>
            <textarea value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none h-32 resize-none" placeholder="Ví dụ: Giúp xanh lá, mập đọt..." />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Hướng dẫn sử dụng</label>
            <textarea value={formData.usageInstructions} onChange={e => setFormData({...formData, usageInstructions: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none h-32 resize-none" placeholder="Pha 20ml cho bình 25 lít nước..." />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => router.back()} className="flex-1 border border-gray-200 text-gray-500 py-4 rounded-xl font-bold hover:bg-gray-50">HỦY BỎ</button>
          <button type="submit" disabled={loading} className="flex-[2] bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg disabled:opacity-50">
            {loading ? "ĐANG LƯU..." : "GỬI DUYỆT SẢN PHẨM"}
          </button>
        </div>
      </form>
    </div>
  );
}
