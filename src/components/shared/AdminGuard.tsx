"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("adminToken") : null;
    if (token === 'simple_admin_token_2026') {
      setAuthorized(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        setAuthorized(true);
      } else {
        setError(data.message || "Mật khẩu không chính xác");
      }
    } catch (err) {
      setError("Lỗi kết nối hệ thống");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Đang xác thực...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-[#1a5c2a] p-12 text-center text-white">
            <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Login</h1>
            <p className="text-green-300 text-[10px] mt-2 font-black tracking-widest uppercase">Phân Bón Giá Tốt - Management</p>
          </div>

          <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Mật khẩu hệ thống</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-center text-2xl tracking-[0.5em]"
                placeholder="••••••"
              />
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "ĐANG XÁC THỰC..." : "VÀO HỆ THỐNG ➜"}
            </button>

            <button type="button" onClick={() => window.location.href = '/'} className="w-full text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#ee4d2d]">
              ← Quay về trang chủ
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
