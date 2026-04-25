"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { API_BASE_URL } from "@/utils/api";
import Link from "next/link";

export default function CustomerAccount() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginError, setLoginError] = useState("");

  const fetchProfile = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        fetchOrders(data.username);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async (phone: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/phone/${phone}`);
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
    } else {
      setIsLoading(false);
      setShowLogin(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowLogin(true);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (res.ok) {
        setIsOtpSent(true);
      } else {
        setLoginError("Không thể gửi OTP. Vui lòng kiểm tra lại SĐT.");
      }
    } catch {
      setLoginError("Lỗi kết nối");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setShowLogin(false);
        fetchOrders(data.username);
      } else {
        setLoginError(data.message || "Mã xác thực không đúng");
      }
    } catch {
      setLoginError("Lỗi kết nối");
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {showLogin ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md mx-auto text-center border border-gray-100">
             <div className="text-5xl mb-6">🔑</div>
             <h1 className="text-2xl font-black text-gray-900 mb-2">Đăng nhập tài khoản</h1>
             <p className="text-gray-500 mb-8 text-sm">Xem lịch sử đơn hàng và nhận ưu đãi riêng cho khách hàng thân thiết.</p>
             
             {loginError && <p className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold mb-6 border border-red-100">{loginError}</p>}
             
             {!isOtpSent ? (
               <form onSubmit={handleSendOtp} className="space-y-4">
                  <input 
                    type="tel" 
                    placeholder="Nhập số điện thoại của bạn..." 
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                  <button className="w-full bg-[#1a5c2a] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all">TIẾP TỤC</button>
               </form>
             ) : (
               <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="bg-emerald-50 text-[#1a5c2a] p-4 rounded-2xl text-xs font-bold mb-4">
                    Mã xác thực đã gửi tới <b>{phone}</b>. <br/>(Dùng 123456 để thử nghiệm)
                  </div>
                  <input 
                    type="text" 
                    placeholder="Nhập mã 6 chữ số..." 
                    className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 text-center text-2xl tracking-[0.5em] outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-black"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <button className="w-full bg-[#1a5c2a] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all uppercase">Xác nhận đăng nhập</button>
                  <button type="button" onClick={() => setIsOtpSent(false)} className="text-xs font-bold text-gray-400 hover:text-[#1a5c2a]">Đổi số điện thoại khác</button>
               </form>
             )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {/* Sidebar Profile */}
             <div className="md:col-span-1 space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                   <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👤</div>
                   <h2 className="font-black text-gray-900 line-clamp-1">{user.vendorInfo?.storeName || 'Khách hàng'}</h2>
                   <p className="text-xs text-gray-400 font-bold mt-1">{user.username}</p>
                   <button onClick={logout} className="mt-6 text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600">Đăng xuất</button>
                </div>
                
                <nav className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                   <Link href="/tai-khoan" className="flex items-center gap-3 px-6 py-4 bg-green-50 text-[#1a5c2a] font-black text-sm">
                      <span>📦</span> Đơn hàng của tôi
                   </Link>
                   <button className="w-full text-left flex items-center gap-3 px-6 py-4 text-gray-500 font-bold text-sm hover:bg-gray-50">
                      <span>🎟️</span> Kho voucher
                   </button>
                   <button className="w-full text-left flex items-center gap-3 px-6 py-4 text-gray-500 font-bold text-sm hover:bg-gray-50">
                      <span>⚙️</span> Cài đặt tài khoản
                   </button>
                </nav>
             </div>

             {/* Order List */}
             <div className="md:col-span-3">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 min-h-[600px]">
                   <div className="p-8 border-b border-gray-50">
                      <h1 className="text-xl font-black text-gray-900 tracking-tight">Lịch sử đơn hàng</h1>
                   </div>
                   
                   <div className="p-8">
                      {orders.length === 0 ? (
                        <div className="text-center py-20">
                           <div className="text-6xl mb-4">🛒</div>
                           <p className="text-gray-400 font-bold italic">Bạn chưa có đơn hàng nào.</p>
                           <Link href="/" className="inline-block mt-6 bg-[#1a5c2a] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg">MUA SẮM NGAY</Link>
                        </div>
                      ) : (
                        <div className="space-y-6">
                           {orders.map(order => (
                             <div key={order._id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gray-50/50 p-4 flex justify-between items-center border-b border-gray-50">
                                   <div className="flex items-center gap-3">
                                      <span className="text-xs font-black text-[#1a5c2a] bg-emerald-50 px-2 py-1 rounded-lg">{order.orderCode}</span>
                                      <span className="text-[10px] text-gray-400 font-bold">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</span>
                                   </div>
                                   <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                                     order.orderStatus === 'done' ? 'bg-green-100 text-green-700' :
                                     order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                   }`}>
                                      {order.orderStatus === 'done' ? 'Đã hoàn thành' : 
                                       order.orderStatus === 'cancelled' ? 'Đã hủy' : 'Đang xử lý'}
                                   </span>
                                </div>
                                <div className="p-6 flex flex-col md:flex-row gap-6">
                                   <div className="flex-1 space-y-4">
                                      {order.orderItems.map((item: any, idx: number) => (
                                        <div key={idx} className="flex items-center gap-4">
                                           <div className="w-12 h-12 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center">📦</div>
                                           <div className="flex-1">
                                              <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</p>
                                              <p className="text-[10px] text-gray-400 font-medium">Số lượng: x{item.qty}</p>
                                           </div>
                                           <p className="text-sm font-bold text-gray-900">₫{item.price.toLocaleString()}</p>
                                        </div>
                                      ))}
                                   </div>
                                   <div className="md:w-48 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                      <div className="text-right">
                                         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tổng cộng</p>
                                         <p className="text-xl font-black text-[#1a5c2a]">₫{order.totalPrice.toLocaleString()}</p>
                                      </div>
                                      <Link 
                                        href={`/tra-cuu-don-hang/ket-qua?code=${order.orderCode}&phone=${order.customerInfo.phone}`}
                                        className="mt-4 text-[10px] font-black text-[#1a5c2a] border border-[#1a5c2a] px-4 py-2 rounded-xl hover:bg-green-50 transition-colors uppercase"
                                      >
                                        Chi tiết vận đơn
                                      </Link>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
