"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function VendorOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/orders/vendor/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId);
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">Đơn Hàng Của Tôi 🛒</h1>
        <p className="text-gray-500 text-sm">Quản lý và cập nhật tiến độ giao hàng cho bà con.</p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Mã Đơn</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Khách Hàng</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Sản Phẩm</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tổng Tiền</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Trạng Thái</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Xử lý</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400">Đang tải đơn hàng...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400">Chưa có đơn hàng nào.</td></tr>
            ) : orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-bold text-blue-600">{order.orderCode}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800">{order.customerInfo.name}</div>
                  <div className="text-xs text-gray-400">{order.customerInfo.phone}</div>
                </td>
                <td className="px-6 py-4">
                  {order.orderItems.map((item: any, idx: number) => (
                    <div key={idx} className="text-xs text-gray-600">
                      • {item.name} x{item.qty}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 font-black text-red-600">
                  ₫{order.totalPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.orderStatus === 'Hoàn thành' ? 'bg-emerald-100 text-emerald-700' : 
                    order.orderStatus === 'Đang giao' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <select 
                     value={order.orderStatus} 
                     onChange={(e) => updateStatus(order._id, e.target.value)}
                     disabled={updating === order._id}
                     className="text-xs font-bold bg-gray-50 border-none rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-100"
                   >
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                      <option value="Đã hủy">Đã hủy</option>
                   </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-400 font-bold">Đang tải đơn hàng...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-bold bg-white rounded-3xl border border-dashed border-gray-200">Chưa có đơn hàng nào.</div>
        ) : orders.map((order) => (
          <div key={order._id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
               <div>
                  <div className="text-blue-600 font-black text-sm mb-1">{order.orderCode}</div>
                  <div className="font-bold text-gray-800">{order.customerInfo.name}</div>
                  <div className="text-xs text-gray-500">{order.customerInfo.phone}</div>
               </div>
               <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${
                    order.orderStatus === 'Hoàn thành' ? 'bg-emerald-100 text-emerald-700' : 
                    order.orderStatus === 'Đang giao' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.orderStatus}
               </span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
               {order.orderItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-xs">
                     <span className="text-gray-600">{item.name}</span>
                     <span className="font-bold text-gray-900">x{item.qty}</span>
                  </div>
               ))}
               <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Tổng cộng</span>
                  <span className="font-black text-red-600">₫{order.totalPrice.toLocaleString()}</span>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cập nhật trạng thái</label>
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['Đang chuẩn bị', 'Đang giao', 'Hoàn thành', 'Đã hủy'].map((status) => (
                    <button 
                      key={status}
                      onClick={() => updateStatus(order._id, status)}
                      disabled={updating === order._id || order.orderStatus === status}
                      className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                        order.orderStatus === status 
                          ? 'bg-gray-100 text-gray-400' 
                          : 'bg-blue-600 text-white shadow-md active:scale-90'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
