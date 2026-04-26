"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import Link from "next/link";

export default function OrderTracking() {
  const [orderCode, setOrderCode] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCode || !phone) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`${API_BASE_URL}/orders/track?code=${orderCode.toUpperCase()}&phone=${phone.replace(/\s/g, '')}`);
      const data = await res.json();

      if (res.ok) {
        setOrder(data);
      } else {
        setError(data.message || "Không tìm thấy đơn hàng. Liên hệ 0773.440.966 để được hỗ trợ.");
      }
    } catch (err) {
      setError("Lỗi kết nối. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ['new', 'confirmed', 'shipping', 'done'];
    return steps.indexOf(status);
  };

  const statusLabels: Record<string, string> = {
    'new': 'Chờ xác nhận',
    'confirmed': 'Đã xác nhận',
    'shipping': 'Đang giao hàng',
    'done': 'Giao hàng thành công',
    'cancelled': 'Đã hủy'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">Tra cứu đơn hàng 📦</h1>
          <p className="text-gray-500 font-medium">Nhập mã đơn hàng và số điện thoại để theo dõi hành trình đơn hàng</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 mb-8">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Mã đơn hàng</label>
                <input 
                  required
                  type="text" 
                  value={orderCode}
                  onChange={e => setOrderCode(e.target.value)}
                  placeholder="Ví dụ: PBG-260424-0001"
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#1a5c2a] focus:bg-white transition-all uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Số điện thoại</label>
                <input 
                  required
                  type="tel" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại khi đặt hàng..."
                  className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#1a5c2a] focus:bg-white transition-all"
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "ĐANG TÌM KIẾM..." : "TRA CỨU NGAY"}
            </button>
          </form>

          {error && (
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
              <span className="text-2xl">⚠️</span>
              <p className="text-sm font-bold text-red-700">{error}</p>
            </div>
          )}
        </div>

        {order && (
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#1a5c2a] p-6 text-white flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Mã đơn hàng</p>
                <h2 className="text-xl font-black">{order.orderCode}</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Trạng thái</p>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase">{statusLabels[order.orderStatus] || order.orderStatus}</span>
              </div>
            </div>

            <div className="p-8">
              {/* Status Timeline */}
              <div className="mb-12">
                <div className="flex justify-between relative">
                  <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -z-0"></div>
                  <div 
                    className="absolute top-4 left-0 h-1 bg-[#f5a623] transition-all duration-1000 -z-0" 
                    style={{ width: `${(getStatusStep(order.orderStatus) / 3) * 100}%` }}
                  ></div>
                  
                  {['new', 'confirmed', 'shipping', 'done'].map((step, idx) => (
                    <div key={step} className="flex flex-col items-center relative z-10 w-1/4">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-md transition-all duration-500 ${
                        getStatusStep(order.orderStatus) >= idx 
                          ? 'bg-[#f5a623] text-white scale-110' 
                          : 'bg-white text-gray-300 border-2 border-gray-100'
                      }`}>
                        {idx === 0 ? '📝' : idx === 1 ? '✅' : idx === 2 ? '🚚' : '🌟'}
                      </div>
                      <p className={`mt-3 text-[10px] font-black uppercase tracking-tight text-center ${getStatusStep(order.orderStatus) >= idx ? 'text-gray-900' : 'text-gray-300'}`}>
                        {statusLabels[step]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Thông tin giao hàng</h3>
                  <div className="space-y-2">
                    <p className="text-sm font-black text-gray-900">{order.customerInfo.name}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{order.customerInfo.address}</p>
                    {order.shippingCode && (
                      <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Mã vận đơn</p>
                        <p className="text-sm font-black text-emerald-800">{order.shippingCode}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Chi tiết đơn hàng</h3>
                  <div className="space-y-3">
                    {order.orderItems.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-sm font-medium">
                        <span className="text-gray-600">x{item.qty} {item.name}</span>
                        <span className="text-gray-900">{(item.qty * item.price).toLocaleString()}đ</span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs font-black text-gray-400 uppercase">Tổng thanh toán</span>
                      <span className="text-xl font-black text-red-600">{order.totalPrice.toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 flex justify-center gap-4">
               <Link href="/" className="text-xs font-bold text-gray-500 hover:text-[#1a5c2a]">Quay lại trang chủ</Link>
               <span className="text-gray-200">|</span>
               <a href="tel:0773440966" className="text-xs font-bold text-[#1a5c2a]">Hỗ trợ: 0773.440.966</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
