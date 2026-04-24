"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function VendorProfile() {
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    address: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = JSON.parse(localStorage.getItem("vendorInfo") || "{}");
    if (user) {
      setFormData({
        storeName: user.storeName || "",
        phone: user.phone || "",
        address: user.address || "",
        description: user.description || ""
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ vendorInfo: formData })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Cập nhật thông tin thành công!");
        localStorage.setItem("vendorInfo", JSON.stringify(data.vendorInfo));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Thông Tin Gian Hàng</h1>
        <p className="text-gray-500">Cập nhật thông tin để khách hàng tin tưởng hơn.</p>
      </div>

      {message && (
        <div className="mb-6 bg-emerald-500 text-white p-4 rounded-2xl font-bold animate-pulse text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tên Cửa Hàng / Đại Lý</label>
          <input required value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Số Điện Thoại Liên Hệ</label>
            <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Địa Chỉ</label>
            <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Giới thiệu về Gian hàng</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-blue-600 outline-none h-32 resize-none" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 shadow-lg disabled:opacity-50">
          {loading ? "ĐANG LƯU..." : "CẬP NHẬT THÔNG TIN"}
        </button>
      </form>
    </div>
  );
}
