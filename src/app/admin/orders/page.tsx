"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import Link from "next/link";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState({ status: '', phone: '' });

  useEffect(() => {
    setMounted(true);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("adminToken") : null;
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
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

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setMessage("Đã cập nhật trạng thái đơn hàng!");
        setTimeout(() => setMessage(""), 3000);
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchStatus = !filter.status || o.orderStatus === filter.status;
    const matchPhone = !filter.phone || o.customerInfo.phone.includes(filter.phone);
    return matchStatus && matchPhone;
  });

  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'confirmed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'shipping': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'done': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight uppercase">Quản Lý Đơn Hàng 📦</h1>
          <p className="text-gray-500 text-sm">Theo dõi, xác nhận và xử lý các đơn hàng trên toàn hệ thống.</p>
        </div>
        {message && (
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold animate-bounce shadow-lg text-sm">
            {message}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Lọc theo trạng thái</label>
          <select 
            value={filter.status} 
            onChange={e => setFilter({ ...filter, status: e.target.value })}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="new">Đơn hàng mới</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="shipping">Đang giao hàng</option>
            <option value="done">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Tìm SĐT khách hàng</label>
          <input 
            type="text" 
            placeholder="0xxx..."
            value={filter.phone}
            onChange={e => setFilter({ ...filter, phone: e.target.value })}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex-[2] text-right">
          <p className="text-xs font-bold text-gray-400 uppercase">Tổng số: {filteredOrders.length} đơn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="bg-white p-20 rounded-[2rem] text-center text-gray-400 font-bold border border-gray-50 animate-pulse">Đang tải dữ liệu đơn hàng...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white p-20 rounded-[2rem] text-center text-gray-400 font-bold border border-gray-50">Không có đơn hàng nào khớp với bộ lọc.</div>
        ) : filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-black">#</div>
                      <div>
                         <h3 className="font-black text-lg text-gray-800 leading-none">{order.orderCode}</h3>
                         <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                            {new Date(order.createdAt).toLocaleString('vi-VN')}
                         </p>
                      </div>
                   </div>
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.orderStatus)}`}>
                      {order.orderStatus === 'new' ? 'Đơn mới' : 
                       order.orderStatus === 'confirmed' ? 'Đã xác nhận' : 
                       order.orderStatus === 'shipping' ? 'Đang giao' : 
                       order.orderStatus === 'done' ? 'Hoàn thành' : 'Đã hủy'}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Khách hàng</p>
                      <p className="text-sm font-black text-gray-800">{order.customerInfo.name}</p>
                      <p className="text-xs font-bold text-emerald-600">{order.customerInfo.phone}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Thanh toán</p>
                      <p className="text-sm font-black text-red-600">₫{order.totalPrice?.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{order.paymentMethod}</p>
                   </div>
                </div>

                <div className="mb-6">
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Sản phẩm</p>
                   <div className="flex flex-wrap gap-2">
                      {order.orderItems.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white border border-gray-100 rounded-xl p-2 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                           </div>
                           <span className="text-[11px] font-bold text-gray-700 line-clamp-1 max-w-[150px]">
                              {item.name} <span className="text-emerald-600">x{item.qty}</span>
                           </span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                   <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">Địa chỉ giao hàng</p>
                   <p className="text-xs font-bold text-gray-700 leading-relaxed">
                      {order.customerInfo.address}, {order.customerInfo.ward}, {order.customerInfo.district}, {order.customerInfo.province}
                   </p>
                </div>
              </div>

              {/* Actions */}
              <div className="md:w-64 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 text-center md:text-left">Thao tác đơn hàng</p>
                 
                 {order.orderStatus === 'new' && (
                    <button onClick={() => updateStatus(order._id, 'confirmed')} className="w-full bg-yellow-500 text-white py-3 rounded-xl font-black text-xs hover:bg-yellow-600 transition-all uppercase tracking-widest shadow-lg shadow-yellow-100">
                       XÁC NHẬN ĐƠN
                    </button>
                 )}
                 
                 {['new', 'confirmed'].includes(order.orderStatus) && (
                    <button onClick={() => updateStatus(order._id, 'shipping')} className="w-full bg-purple-600 text-white py-3 rounded-xl font-black text-xs hover:bg-purple-700 transition-all uppercase tracking-widest shadow-lg shadow-purple-100">
                       GIAO HÀNG
                    </button>
                 )}
                 
                 {order.orderStatus === 'shipping' && (
                    <button onClick={() => updateStatus(order._id, 'done')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-black text-xs hover:bg-emerald-700 transition-all uppercase tracking-widest shadow-lg shadow-emerald-100">
                       HOÀN THÀNH
                    </button>
                 )}

                 {order.orderStatus !== 'done' && order.orderStatus !== 'cancelled' && (
                    <button onClick={() => updateStatus(order._id, 'cancelled')} className="w-full border-2 border-red-50 text-red-400 py-3 rounded-xl font-black text-[10px] hover:bg-red-50 hover:text-red-600 transition-all uppercase tracking-widest mt-auto">
                       HỦY ĐƠN
                    </button>
                 )}
                 
                 <Link href={`/don-hang/${order.orderCode}`} target="_blank" className="w-full bg-gray-50 text-gray-400 py-3 rounded-xl font-black text-[10px] hover:bg-gray-100 hover:text-gray-600 transition-all uppercase tracking-widest text-center mt-2">
                    XEM CHI TIẾT (USER VIEW)
                 </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
