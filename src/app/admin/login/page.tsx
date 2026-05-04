"use client";
import { API_BASE_URL } from '@/utils/api';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#1a5c2a] p-10 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <ShieldCheck size={100} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight">Quản Trị Hệ Thống</h1>
          <p className="text-emerald-300 text-xs mt-2 font-bold tracking-widest">PHANBONGIATOT.COM</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-3 animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Tài khoản quản trị</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a5c2a] transition-colors">
                  <User size={18} />
                </div>
                <input 
                  required
                  type="text" 
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all text-sm font-bold"
                  placeholder="Admin username"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Mật khẩu bảo mật</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1a5c2a] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-50 bg-gray-50 rounded-2xl pl-12 pr-12 py-4 outline-none focus:border-[#1a5c2a] focus:bg-white transition-all text-sm font-bold"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a5c2a] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-[#1a5c2a] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-900/20 hover:bg-[#144520] hover:scale-[1.02] active:scale-95 transition-all disabled:bg-gray-300 disabled:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ĐANG XÁC THỰC...
              </span>
            ) : "ĐĂNG NHẬP NGAY"}
          </button>

          <div className="pt-4 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
              Hệ thống bảo mật đa lớp.<br/>Mọi truy cập trái phép sẽ bị ghi lại IP.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
