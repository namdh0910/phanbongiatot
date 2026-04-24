"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, field: string, value: string) => {
    try {
      const payload: any = {};
      payload[field] = value;
      
      const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        fetchOrders();
        if (selectedOrder && selectedOrder._id === id) {
          const updated = await res.json();
          setSelectedOrder(updated);
        }
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (error) {
      alert('Lỗi kết nối');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Chờ xác nhận': return 'bg-yellow-100 text-yellow-800';
      case 'Đã xác nhận': return 'bg-blue-100 text-blue-800';
      case 'Đang giao': return 'bg-purple-100 text-purple-800';
      case 'Hoàn thành': return 'bg-green-100 text-green-800';
      case 'Đã hủy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
               <h1 className="text-2xl font-black text-gray-800 tracking-tight">Quản lý Đơn hàng</h1>
               <p className="text-sm text-gray-500 font-medium">Theo dõi và xử lý đơn hàng từ website</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 text-center">
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Tổng đơn</p>
                <p className="text-xl font-black text-emerald-800">{orders.length}</p>
              </div>
              <div className="bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100 text-center">
                <p className="text-xs text-yellow-600 font-bold uppercase tracking-wider">Chờ xử lý</p>
                <p className="text-xl font-black text-yellow-800">{orders.filter(o => o.orderStatus === 'Chờ xác nhận').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/40">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-gray-50/30 border-b border-gray-100">
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Mã Đơn / Khách hàng</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Sản phẩm</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Tổng tiền</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px]">Trạng thái</th>
                  <th className="p-6 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-20 text-center">Đang tải dữ liệu...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={5} className="p-20 text-center text-gray-400 font-bold">Chưa có đơn hàng nào</td></tr>
                ) : orders.map(o => (
                  <tr key={o._id} className="hover:bg-emerald-50/40 transition-all group">
                    <td className="p-6">
                      <p className="font-black text-[#1a5c2a]">{o.orderCode}</p>
                      <p className="font-bold text-gray-800 mt-1">{o.customerInfo.name}</p>
                      <p className="text-xs text-gray-500">{o.customerInfo.phone}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(o.createdAt).toLocaleString("vi-VN")}</p>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        {o.orderItems.map((item: any, i: number) => (
                          <div key={i} className="flex gap-2 items-center text-xs">
                            <span className="font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">x{item.qty}</span>
                            <span className="text-gray-600 line-clamp-1">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-black text-red-600">{o.totalPrice.toLocaleString("vi-VN")}đ</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{o.paymentMethod}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold ${o.paymentStatus === 'Đã thanh toán' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="p-6">
                      <select 
                        value={o.orderStatus} 
                        onChange={(e) => updateStatus(o._id, 'status', e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border-0 outline-none cursor-pointer appearance-none ${getStatusColor(o.orderStatus)}`}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    </td>
                    <td className="p-6 text-right">
                      <button 
                        onClick={() => setSelectedOrder(o)}
                        className="bg-white border border-gray-200 text-gray-600 hover:text-[#1a5c2a] hover:border-[#1a5c2a] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal Chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-xl font-black text-gray-900">Chi tiết Đơn hàng: <span className="text-[#1a5c2a]">{selectedOrder.orderCode}</span></h2>
                <p className="text-xs text-gray-500 mt-1">Ngày đặt: {new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-50 pb-2">Khách hàng</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500 w-24 inline-block">Họ tên:</span> <span className="font-bold">{selectedOrder.customerInfo.name}</span></p>
                    <p><span className="text-gray-500 w-24 inline-block">SĐT:</span> <span className="font-bold text-[#1a5c2a]">{selectedOrder.customerInfo.phone}</span></p>
                    <p className="flex"><span className="text-gray-500 w-24 flex-shrink-0">Địa chỉ:</span> <span className="font-medium">{selectedOrder.customerInfo.address}, {selectedOrder.customerInfo.ward}, {selectedOrder.customerInfo.district}, {selectedOrder.customerInfo.province}</span></p>
                    {selectedOrder.customerInfo.note && (
                      <p className="mt-3 p-3 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-100 text-xs font-medium italic">Ghi chú: {selectedOrder.customerInfo.note}</p>
                    )}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-50 pb-2">Thanh toán & Vận chuyển</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Thanh toán:</span>
                      <span className="font-bold">{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Trạng thái TT:</span>
                      <select 
                        value={selectedOrder.paymentStatus}
                        onChange={(e) => updateStatus(selectedOrder._id, 'paymentStatus', e.target.value)}
                        className="text-xs font-bold px-2 py-1 rounded bg-gray-50 border border-gray-200 outline-none"
                      >
                        <option value="Chưa thanh toán">Chưa thanh toán</option>
                        <option value="Đã thanh toán">Đã thanh toán</option>
                        <option value="Lỗi">Lỗi</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                      <span className="text-gray-500">Mã vận đơn:</span>
                      <input 
                        type="text" 
                        placeholder="Nhập mã GHN/GHTK..."
                        defaultValue={selectedOrder.shippingCode || ''}
                        onBlur={(e) => {
                          if (e.target.value !== selectedOrder.shippingCode) {
                            updateStatus(selectedOrder._id, 'shippingCode', e.target.value);
                          }
                        }}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 w-32 text-right outline-none focus:border-[#1a5c2a]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-50 pb-2">Sản phẩm</h3>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 font-bold uppercase bg-gray-50/50">
                    <tr>
                      <th className="py-2 px-3 rounded-l-lg">Sản phẩm</th>
                      <th className="py-2 px-3 text-center">SL</th>
                      <th className="py-2 px-3 text-right">Đơn giá</th>
                      <th className="py-2 px-3 text-right rounded-r-lg">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {selectedOrder.orderItems.map((item: any, i: number) => (
                      <tr key={i}>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <img src={item.image} className="w-10 h-10 rounded-md object-cover border border-gray-100" />
                            <span className="font-bold text-gray-700">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center font-bold">{item.qty}</td>
                        <td className="py-3 px-3 text-right text-gray-500">{item.price.toLocaleString("vi-VN")}đ</td>
                        <td className="py-3 px-3 text-right font-bold text-gray-800">{(item.qty * item.price).toLocaleString("vi-VN")}đ</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t border-gray-100">
                    <tr>
                      <td colSpan={3} className="py-3 px-3 text-right text-gray-500">Tạm tính:</td>
                      <td className="py-3 px-3 text-right font-bold">{selectedOrder.itemsPrice.toLocaleString("vi-VN")}đ</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="py-1 px-3 text-right text-gray-500">Phí vận chuyển:</td>
                      <td className="py-1 px-3 text-right font-bold">{selectedOrder.shippingFee.toLocaleString("vi-VN")}đ</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="py-3 px-3 text-right font-black text-gray-800 text-base">Tổng cộng:</td>
                      <td className="py-3 px-3 text-right font-black text-red-600 text-lg">{selectedOrder.totalPrice.toLocaleString("vi-VN")}đ</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button onClick={() => setSelectedOrder(null)} className="px-6 py-2.5 bg-[#1a5c2a] text-white rounded-xl font-bold hover:bg-[#2d7a3e] transition-colors shadow-md">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminGuard>
  );
}
