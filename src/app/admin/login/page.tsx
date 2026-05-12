"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        router.push("/admin/dashboard");
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
    <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#1a5c2a] p-12 text-center text-white">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Access</h1>
          <p className="text-green-300 text-[10px] mt-2 font-black tracking-widest uppercase">Quản Trị Hệ Thống v2.0</p>
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-8">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-2 animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-3 ml-1 tracking-widest">Mật khẩu bảo mật</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-center text-3xl tracking-[0.5em]"
              placeholder="••••••"
            />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-900/20 hover:bg-[#144520] transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "ĐANG XÁC THỰC..." : "ĐĂNG NHẬP NGAY"}
          </button>

          <div className="text-center">
            <button type="button" onClick={() => router.push('/')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#ee4d2d]">
              ← Quay về trang chủ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
