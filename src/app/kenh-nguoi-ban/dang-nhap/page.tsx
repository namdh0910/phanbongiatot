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
        router.push("/kenh-nguoi-ban/dashboard");
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Column: Form Section */}
      <div className="w-full md:w-[45%] flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white relative">
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-black text-[#1a5c2a] italic tracking-tighter">PHÂN BÓN GIÁ TỐT</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Cổng quản lý gian hàng</p>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto md:mx-0">
          <h2 className="text-4xl font-black text-gray-900 mb-2 leading-tight">Chào mừng đối tác quay trở lại!</h2>
          <p className="text-gray-500 mb-10 text-lg">Đăng nhập để quản lý đơn hàng và doanh số của anh/chị ngay hôm nay.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-8 font-bold border border-red-100 flex items-center gap-3">
              <span className="text-xl">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Tài khoản quản lý</label>
                <input 
                  required 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  autoComplete="username"
                  className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-gray-900 outline-none focus:bg-white focus:border-[#1a5c2a] focus:ring-4 focus:ring-green-50 transition-all font-medium" 
                  placeholder="Nhập tên đăng nhập..." 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Mật khẩu</label>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  autoComplete="current-password"
                  className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl px-6 py-4 text-gray-900 outline-none focus:bg-white focus:border-[#1a5c2a] focus:ring-4 focus:ring-green-50 transition-all font-medium" 
                  placeholder="Nhập mật khẩu bảo mật..." 
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
               <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1a5c2a] focus:ring-[#1a5c2a]" />
                  <span className="text-sm text-gray-600 font-medium">Ghi nhớ đăng nhập</span>
               </label>
               <Link href="/quen-mat-khau" className="text-sm text-[#1a5c2a] font-bold hover:underline">Quên mật khẩu?</Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#2d7a3e] transition-all shadow-xl shadow-green-900/20 disabled:opacity-50 active:scale-95"
            >
              {loading ? "ĐANG XÁC THỰC..." : "ĐĂNG NHẬP NGAY"}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-gray-100 text-center md:text-left">
            <p className="text-gray-500 mb-4">Anh/chị chưa có gian hàng?</p>
            <Link href="/kenh-nguoi-ban/dang-ky" className="text-[#1a5c2a] font-black hover:underline text-lg">
              Đăng ký hợp tác bán hàng cùng chúng tôi ➜
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column: Benefits & Trust Signals */}
      <div className="hidden md:flex flex-1 bg-[#1a5c2a] relative overflow-hidden flex-col justify-center p-20 text-white">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
         
         <div className="relative z-10 max-w-lg">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 mb-12">
               <h3 className="text-3xl font-black mb-6 leading-tight uppercase italic">Tại sao nên bán hàng tại Phân Bón Giá Tốt?</h3>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <span className="text-2xl">📈</span>
                     <div>
                        <h4 className="font-bold text-lg">Tiếp cận 500.000+ Nhà vườn</h4>
                        <p className="text-green-100 text-sm">Hệ thống khách hàng trung thành khắp các tỉnh Tây Nguyên và Miền Tây.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <span className="text-2xl">⚡</span>
                     <div>
                        <h4 className="font-bold text-lg">Duyệt gian hàng trong 24h</h4>
                        <p className="text-green-100 text-sm">Quy trình đăng ký đơn giản, hỗ trợ kỹ thuật tận tình 24/7.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <span className="text-2xl">🛡️</span>
                     <div>
                        <h4 className="font-bold text-lg">Bảo mật & Minh bạch</h4>
                        <p className="text-green-100 text-sm">Hệ thống báo cáo doanh thu thời gian thực, đối soát dòng tiền rõ ràng.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pl-4">
               <div>
                  <p className="text-4xl font-black mb-1">500+</p>
                  <p className="text-green-200 text-xs font-bold uppercase tracking-widest">Đối tác đại lý</p>
               </div>
               <div>
                  <p className="text-4xl font-black mb-1">98%</p>
                  <p className="text-green-200 text-xs font-bold uppercase tracking-widest">Hài lòng từ seller</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
