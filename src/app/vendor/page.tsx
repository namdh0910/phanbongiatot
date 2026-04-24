"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function VendorDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  const [vendorInfo, setVendorInfo] = useState<any>(null);

  useEffect(() => {
    const info = localStorage.getItem("vendorInfo");
    if (info) setVendorInfo(JSON.parse(info));

    // Fetch vendor stats (simplified for now)
    const token = localStorage.getItem("vendorToken");
    fetch(`${API_BASE_URL}/products/vendor/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(products => {
      setStats(prev => ({ ...prev, totalProducts: products.length }));
    });
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Xin chào, {vendorInfo?.storeName || "Chủ gian hàng"}! 👋</h1>
          <p className="text-gray-500 mt-1">Chúc anh/chị một ngày kinh doanh thuận lợi.</p>
        </div>
        {vendorInfo?.isApproved === false && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl text-sm font-bold border border-yellow-200">
            ⚠️ Gian hàng đang chờ duyệt
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">📦</div>
          <div className="text-gray-400 text-xs font-bold uppercase mb-1">Sản phẩm của tôi</div>
          <div className="text-2xl font-black text-gray-800">{stats.totalProducts}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">🛒</div>
          <div className="text-gray-400 text-xs font-bold uppercase mb-1">Đơn hàng mới</div>
          <div className="text-2xl font-black text-blue-600">{stats.pendingOrders}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-gray-400 text-xs font-bold uppercase mb-1">Doanh thu tạm tính</div>
          <div className="text-2xl font-black text-emerald-600">₫0</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-gray-400 text-xs font-bold uppercase mb-1">Đánh giá Shop</div>
          <div className="text-2xl font-black text-yellow-500">5.0</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
            🚀 Mẹo bán hàng hiệu quả
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800">
              <b>1. Hình ảnh sản phẩm:</b> Hãy chụp ảnh thật, rõ ràng để bà con tin tưởng hơn.
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-sm text-green-800">
              <b>2. Tư vấn tận tâm:</b> Phản hồi tin nhắn Zalo nhanh giúp tỉ lệ chốt đơn tăng 80%.
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-sm text-purple-800">
              <b>3. Mô tả chi tiết:</b> Ghi rõ cách bón phân cho từng giai đoạn cây trồng.
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          <div className="text-6xl mb-4">📢</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Thông báo từ hệ thống</h3>
          <p className="text-gray-500 text-sm">Hiện tại hệ thống Marketplace đang trong quá trình nâng cấp. Anh/chị có thể bắt đầu đăng sản phẩm để chờ duyệt.</p>
        </div>
      </div>
    </div>
  );
}
