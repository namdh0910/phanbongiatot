"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from '@/utils/api';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  
  // Login form state for integrated login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("adminToken") : null;
    if (token) {
      setAuthorized(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data));
        setAuthorized(true);
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Đang khởi tạo...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-[#0d2a1c] p-10 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <h1 className="text-2xl font-black uppercase tracking-tight relative z-10">Admin Access</h1>
            <p className="text-emerald-400 text-[10px] mt-2 font-black tracking-widest relative z-10 uppercase">Hệ Thống Phân Bón Giá Tốt</p>
          </div>

          <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 animate-shake flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Tài khoản quản trị</label>
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#ee4d2d] transition-all font-bold"
                  placeholder="Username..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Mật khẩu bảo mật</label>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#ee4d2d] transition-all font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-[#2d7a3e] hover:-translate-y-1 transition-all disabled:bg-gray-300 disabled:shadow-none"
            >
              {loading ? "ĐANG XÁC THỰC..." : "ĐĂNG NHẬP HỆ THỐNG ➜"}
            </button>

            <div className="flex flex-col items-center gap-4 pt-4">
               <p className="text-center text-[10px] text-gray-400 font-bold uppercase leading-relaxed">
                  Phiên đăng nhập đã hết hạn hoặc chưa được xác thực. Vui lòng đăng nhập để tiếp tục.
               </p>
               <button type="button" onClick={() => window.location.href = '/'} className="text-[10px] font-black text-[#ee4d2d] uppercase tracking-widest hover:underline">
                  ← Quay về trang chủ
               </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
