"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import Link from "next/link";

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    storeName: "",
    phone: "",
    address: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register-vendor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Lỗi đăng ký");
      }
    } catch {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-black text-gray-900 mb-4">Đăng ký thành công!</h1>
          <p className="text-gray-600 mb-8">
            Yêu cầu mở gian hàng của anh/chị đã được gửi đi. Ban quản trị <b>Phân Bón Giá Tốt</b> sẽ kiểm tra và liên hệ kích hoạt trong vòng 24h.
          </p>
          <Link href="/" className="block w-full bg-[#1a5c2a] text-white py-4 rounded-xl font-bold"> Quay lại trang chủ </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left side: Branding */}
        <div className="md:w-1/3 bg-[#1a5c2a] p-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-black mb-6 italic leading-tight">Hợp tác cùng <br/>Phân Bón Giá Tốt</h2>
          <p className="text-green-100 text-sm mb-8 leading-relaxed">
            Mở rộng kinh doanh, tiếp cận hàng ngàn nhà nông trên khắp cả nước. Chúng tôi cung cấp nền tảng quản lý chuyên nghiệp cho đại lý của bạn.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">✅ Quản lý kho hàng thông minh</li>
            <li className="flex items-center gap-3">✅ Tiếp cận khách hàng mục tiêu</li>
            <li className="flex items-center gap-3">✅ Báo cáo doanh thu chi tiết</li>
          </ul>
        </div>

        {/* Right side: Form */}
        <div className="flex-1 p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900">Đăng ký mở gian hàng</h1>
            <p className="text-gray-500 text-sm">Vui lòng điền đầy đủ thông tin đại lý/cửa hàng</p>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 font-bold">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Tên đăng nhập</label>
                <input required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#1a5c2a] transition-all" placeholder="Ví dụ: dailytuanh..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Mật khẩu</label>
                <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#1a5c2a] transition-all" placeholder="Tối thiểu 8 ký tự..." />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Tên cửa hàng / Đại lý</label>
              <input required value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#1a5c2a] transition-all" placeholder="Ví dụ: Đại lý Phân bón Tư Anh..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Số điện thoại liên hệ</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#1a5c2a] transition-all" placeholder="Số điện thoại..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Địa chỉ cửa hàng</label>
                <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#1a5c2a] transition-all" placeholder="Địa chỉ đại lý..." />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Giới thiệu ngắn</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#1a5c2a] transition-all h-24 resize-none" placeholder="Đại lý chuyên cung cấp các loại phân bón..." />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1a5c2a] text-white py-4 rounded-xl font-black text-lg hover:bg-[#2d7a3e] transition-all shadow-lg disabled:opacity-50 mt-4"
            >
              {loading ? "Đang xử lý..." : "GỬI ĐĂNG KÝ NGAY"}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Bằng cách đăng ký, bạn đồng ý với các Điều khoản & Quy định của chúng tôi.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
