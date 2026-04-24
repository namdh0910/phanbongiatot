"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function VendorOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800">Đơn Hàng Của Tôi</h1>
        <p className="text-gray-500">Quản lý và xử lý đơn hàng từ khách hàng.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Mã Đơn</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Khách Hàng</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Sản Phẩm</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Tổng Tiền</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Đang tải đơn hàng...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-16 text-center text-gray-400">Chưa có đơn hàng nào.</td></tr>
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
                <td className="px-6 py-4 text-right font-black text-red-600">
                  ₫{order.totalPrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.orderStatus === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
