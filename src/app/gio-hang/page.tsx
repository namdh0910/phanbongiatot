"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { API_BASE_URL } from "@/utils/api";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');
  
  // Order history state
  const [phone, setPhone] = useState('');
  const [savedPhone, setSavedPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const sp = localStorage.getItem('pbgt_phone');
    if (sp) {
      setSavedPhone(sp);
      setPhone(sp);
      fetchOrders(sp);
    }
  }, []);

  const fetchOrders = async (phoneNum: string) => {
    const clean = phoneNum.replace(/\s/g, '');
    if (!clean) return;
    setLoadingOrders(true);
    setHasSearched(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders/phone/${clean}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        setSavedPhone(clean);
        localStorage.setItem('pbgt_phone', clean);
      }
    } catch {
    } finally {
      setLoadingOrders(false);
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(phone);
  };

  const handleLogout = () => {
    localStorage.removeItem('pbgt_phone');
    setSavedPhone('');
    setPhone('');
    setOrders([]);
    setHasSearched(false);
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Chờ xác nhận': return 'bg-yellow-100 text-yellow-800';
      case 'Đã xác nhận': return 'bg-blue-100 text-blue-800';
      case 'Đang giao': return 'bg-purple-100 text-purple-800';
      case 'Hoàn thành': return 'bg-green-100 text-green-800';
      case 'Đã hủy': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Tabs */}
        <div className="flex bg-white rounded-t-2xl shadow-sm border border-gray-100 overflow-hidden mb-0">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-4 text-center font-black text-sm transition-all relative ${
              activeTab === 'cart' 
                ? 'text-[#ee4d2d] bg-white' 
                : 'text-gray-400 bg-gray-50 hover:text-gray-600'
            }`}
          >
            🛒 GIỎ HÀNG {cart.length > 0 && <span className="ml-1 bg-[#ee4d2d] text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>}
            {activeTab === 'cart' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ee4d2d]" />}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 text-center font-black text-sm transition-all relative ${
              activeTab === 'orders' 
                ? 'text-[#1a5c2a] bg-white' 
                : 'text-gray-400 bg-gray-50 hover:text-gray-600'
            }`}
          >
            📋 ĐƠN HÀNG CỦA TÔI {orders.length > 0 && <span className="ml-1 bg-[#1a5c2a] text-white text-xs px-2 py-0.5 rounded-full">{orders.length}</span>}
            {activeTab === 'orders' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5c2a]" />}
          </button>
        </div>

        {/* ===== TAB 1: GIỎ HÀNG ===== */}
        {activeTab === 'cart' && (
          <>
            {cart.length === 0 ? (
              <div className="bg-white p-20 text-center rounded-b-2xl shadow-sm border border-t-0 border-gray-100">
                <div className="text-8xl mb-6 opacity-20">🛒</div>
                <p className="text-gray-500 mb-8">Giỏ hàng của bạn đang trống.</p>
                <Link href="/" className="bg-[#ee4d2d] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#d73211] transition-all">
                  MUA SẮM NGAY
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-0">
                <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase">Sản phẩm</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">Số lượng</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">Đơn giá</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {cart.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50/50">
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                                {item.images?.[0] ? <img src={item.images[0]} className="w-full h-full object-cover" /> : "🌱"}
                              </div>
                              <div>
                                <Link href={`/san-pham/${item.slug}`} className="font-bold text-gray-900 hover:text-[#ee4d2d] line-clamp-1">
                                  {item.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center font-bold">{item.quantity}</td>
                          <td className="p-4 text-center">
                            <span className="text-[#ee4d2d] font-bold">₫{item.price?.toLocaleString("vi-VN")}</span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => removeFromCart(i)}
                              className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Summary */}
                <div className="bg-white p-6 rounded-2xl shadow-sm mt-4 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-100">
                  <div>
                    <p className="text-gray-500 text-sm">Tổng thanh toán ({cart.length} sản phẩm):</p>
                    <p className="text-3xl font-black text-[#ee4d2d]">₫{cartTotal.toLocaleString("vi-VN")}</p>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <Link href="/" className="flex-1 md:flex-none text-center border border-gray-200 px-8 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
                      TIẾP TỤC MUA
                    </Link>
                    <button 
                      onClick={() => router.push('/checkout')}
                      className="flex-1 md:flex-none bg-[#ee4d2d] text-white px-12 py-4 rounded-xl font-black text-lg shadow-lg hover:bg-[#d73211] transition-all"
                    >
                      ĐẶT HÀNG NGAY
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ===== TAB 2: ĐƠN HÀNG CỦA TÔI ===== */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-gray-100 overflow-hidden">
            
            {/* Phone login section */}
            {!savedPhone ? (
              <div className="p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  📱
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Tra cứu đơn hàng</h2>
                <p className="text-gray-500 mb-8">Nhập số điện thoại bạn đã dùng khi đặt hàng</p>
                <form onSubmit={handlePhoneSubmit} className="max-w-sm mx-auto flex gap-3">
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-lg font-bold text-center tracking-widest focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none"
                    placeholder="0773 440 966"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loadingOrders}
                    className="bg-[#1a5c2a] text-white px-6 py-3 rounded-xl font-black hover:bg-[#2d7a3e] transition-colors shadow-md disabled:opacity-50"
                  >
                    {loadingOrders ? '...' : 'Tìm'}
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* User header bar */}
                <div className="p-4 md:p-6 bg-green-50 border-b border-green-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center font-black text-sm">
                      {savedPhone.slice(-2)}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm">Số điện thoại: {savedPhone}</p>
                      <p className="text-xs text-gray-500">{orders.length} đơn hàng</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-red-500 font-bold transition-colors">
                    Đổi SĐT
                  </button>
                </div>

                {/* Order list */}
                {orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4 opacity-20">📦</div>
                    <p className="text-gray-500 mb-2">Không tìm thấy đơn hàng nào với số điện thoại này</p>
                    <p className="text-xs text-gray-400">Hãy kiểm tra lại số điện thoại bạn đã dùng khi đặt hàng</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {orders.map((order: any) => (
                      <Link
                        key={order._id}
                        href={`/don-hang/${order.orderCode}`}
                        className="block p-4 md:p-6 hover:bg-gray-50/50 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="font-black text-[#1a5c2a] tracking-wider group-hover:underline">{order.orderCode}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {order.orderItems.slice(0, 3).map((item: any, idx: number) => (
                              <div key={idx} className="w-10 h-10 rounded-lg border-2 border-white bg-gray-100 overflow-hidden flex-shrink-0">
                                {item.image ? <img src={item.image} className="w-full h-full object-cover" alt="" /> : <span className="flex items-center justify-center h-full text-sm">📦</span>}
                              </div>
                            ))}
                            {order.orderItems.length > 3 && (
                              <div className="w-10 h-10 rounded-lg border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                                +{order.orderItems.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 truncate">
                              {order.orderItems.map((i: any) => i.name).join(', ')}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-black text-gray-900">{order.totalPrice?.toLocaleString('vi-VN')}đ</p>
                            <p className="text-xs text-emerald-600 font-bold">Xem →</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
