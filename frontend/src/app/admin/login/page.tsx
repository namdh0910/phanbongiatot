import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        router.push("/admin");
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#0d2a1c] p-8 text-center text-white">
          <h1 className="text-2xl font-black uppercase tracking-tight">Quản Trị Hệ Thống</h1>
          <p className="text-emerald-400 text-xs mt-2 font-bold">PHANBONGITATOT.COM</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 animate-shake">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Tài khoản</label>
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ee4d2d] transition-all"
                placeholder="Admin username"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 ml-1">Mật khẩu</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-[#ee4d2d] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-[#ee4d2d] text-white py-4 rounded-xl font-black text-lg shadow-lg hover:bg-[#d73211] transition-all disabled:bg-gray-400"
          >
            {loading ? "ĐANG KIỂM TRA..." : "ĐĂNG NHẬP NGAY"}
          </button>

          <p className="text-center text-[10px] text-gray-400">
            Hệ thống bảo mật cao. Mọi truy cập đều được ghi lại.
          </p>
        </form>
      </div>
    </div>
  );
}
