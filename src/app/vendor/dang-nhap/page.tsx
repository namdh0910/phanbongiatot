"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";
import Link from "next/link";

export default function VendorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.role !== 'vendor' && data.role !== 'admin') {
          setError("Tài khoản này không có quyền truy cập gian hàng");
          return;
        }
        localStorage.setItem("vendorToken", data.token);
        localStorage.setItem("vendorInfo", JSON.stringify(data.vendorInfo));
        localStorage.setItem("userRole", data.role);
        router.push("/vendor");
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-lg w-full p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-[#1a5c2a] mb-2 italic">PHÂN BÓN GIÁ TỐT</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Cổng quản trị gian hàng</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 font-bold text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Tên đăng nhập</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👤</span>
              <input 
                required 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-12 py-4 text-gray-900 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all" 
                placeholder="Tên đăng nhập của anh/chị..." 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Mật khẩu</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔒</span>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-12 py-4 text-gray-900 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all" 
                placeholder="Mật khẩu bảo mật..." 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a5c2a] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#2d7a3e] transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "Đang xác thực..." : "ĐĂNG NHẬP NGAY"}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-gray-500 text-sm">Chưa có gian hàng trên hệ thống?</p>
          <Link href="/vendor/dang-ky" className="inline-block text-[#1a5c2a] font-black border-2 border-[#1a5c2a] px-8 py-3 rounded-2xl hover:bg-green-50 transition-all">
            ĐĂNG KÝ HỢP TÁC NGAY
          </Link>
          <div className="pt-4">
            <Link href="/" className="text-gray-400 text-xs hover:underline">Quay lại trang chủ mua sắm</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
