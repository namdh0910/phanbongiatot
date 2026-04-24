"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import Link from "next/link";

export default function VendorProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/products/vendor/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Sản Phẩm Của Tôi</h1>
          <p className="text-gray-500">Quản lý kho hàng và trạng thái hiển thị</p>
        </div>
        <Link href="/kenh-nguoi-ban/products/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg">
          <span>➕</span> THÊM SẢN PHẨM MỚI
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Sản phẩm</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Danh mục</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Giá bán</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Trạng thái</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Chưa có sản phẩm nào. Hãy đăng sản phẩm đầu tiên!</td></tr>
            ) : products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      {product.images?.[0] && <img src={product.images[0]} className="w-full h-full object-cover" alt="" />}
                    </div>
                    <div className="font-bold text-gray-800 line-clamp-1">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 font-bold text-gray-900">₫{product.price?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    product.status === 'approved' ? 'bg-green-100 text-green-700' : 
                    product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.status === 'approved' ? 'Đã duyệt' : product.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/kenh-nguoi-ban/products/edit/${product._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">✏️</Link>
                    <button onClick={() => deleteProduct(product._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
