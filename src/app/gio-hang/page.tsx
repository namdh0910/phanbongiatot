"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { API_BASE_URL } from "@/utils/api";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');
  
  // Order history state
  const [phone, setPhone] = useState('');
  const [savedPhone, setSavedPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Group cart items by seller
  const groupedCart = useMemo(() => {
    const groups: Record<string, { sellerName: string, items: any[] }> = {};
    
    cart.forEach(item => {
      const sellerId = item.seller?._id || 'admin';
      const sellerName = item.seller?.vendorInfo?.storeName || (item.seller?.role === 'admin' ? "Phân Bón Giá Tốt (Mall)" : "Gian hàng đối tác");
      
      if (!groups[sellerId]) {
        groups[sellerId] = { sellerName, items: [] };
      }
      groups[sellerId].items.push(item);
    });
    
    return Object.entries(groups);
  }, [cart]);

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
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Navigation Tabs */}
        <div className="flex bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-2 mb-8 border border-gray-100">
          <button
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'cart' 
                ? 'bg-[#ee4d2d] text-white shadow-lg shadow-red-100' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">🛒</span> 
            GIỎ HÀNG 
            {cart.length > 0 && (
              <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'cart' ? 'bg-white text-[#ee4d2d]' : 'bg-gray-100 text-gray-500'}`}>
                {cart.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'orders' 
                ? 'bg-[#1a5c2a] text-white shadow-lg shadow-green-100' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">📦</span> 
            ĐƠN HÀNG CỦA TÔI
            {orders.length > 0 && (
              <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white text-[#1a5c2a]' : 'bg-gray-100 text-gray-500'}`}>
                {orders.length}
              </span>
            )}
          </button>
        </div>

        {/* ===== TAB 1: GIỎ HÀNG ===== */}
        {activeTab === 'cart' && (
          <div className="space-y-6">
            {cart.length === 0 ? (
              <div className="bg-white p-20 text-center rounded-[3rem] shadow-sm border border-gray-100">
                <div className="text-8xl mb-8 opacity-20 filter grayscale">🛍️</div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Giỏ hàng trống!</h2>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">Chưa có sản phẩm nào được thêm. Bà con quay lại cửa hàng chọn thêm nhé!</p>
                <Link href="/" className="bg-[#ee4d2d] text-white px-12 py-4 rounded-2xl font-black text-sm hover:bg-[#d73211] transition-all shadow-xl shadow-red-100">
                  TIẾP TỤC MUA SẮM
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {groupedCart.map(([sellerId, { sellerName, items }]) => (
                    <div key={sellerId} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                      {/* Seller Header */}
                      <div className="bg-gray-50/80 px-6 py-4 flex items-center gap-3 border-b border-gray-100">
                         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-gray-100">🏪</div>
                         <h3 className="font-black text-sm text-gray-800 uppercase tracking-tight">{sellerName}</h3>
                         <div className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">GIAN HÀNG ĐÃ XÁC MINH</div>
                      </div>

                      {/* Items List */}
                      <div className="divide-y divide-gray-50">
                        {items.map((item, i) => {
                          // Find index in main cart for updateQuantity
                          const cartIndex = cart.findIndex(c => c._id === item._id && c.selectedVariant === item.selectedVariant);
                          return (
                            <div key={`${item._id}-${item.selectedVariant || i}`} className="p-6 flex flex-col md:flex-row items-center gap-6 group hover:bg-gray-50/30 transition-colors">
                              <div className="flex items-center gap-4 flex-1 w-full">
                                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                                  {item.images?.[0] ? <img src={item.images[0]} className="w-full h-full object-cover" /> : "🌿"}
                                </div>
                                <div className="flex-1">
                                  <Link href={`/san-pham/${item.slug}`} className="font-bold text-gray-900 hover:text-[#ee4d2d] line-clamp-2 text-sm leading-snug">
                                    {item.name}
                                  </Link>
                                  {item.selectedVariant && (
                                    <div className="mt-1 flex items-center gap-1">
                                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Phân loại:</span>
                                      <span className="text-[10px] text-[#ee4d2d] font-black uppercase">{item.selectedVariant}</span>
                                    </div>
                                  )}
                                  <div className="md:hidden mt-2 flex justify-between items-center">
                                     <span className="text-red-600 font-black">₫{item.price?.toLocaleString("vi-VN")}</span>
                                     <button onClick={() => removeFromCart(cartIndex)} className="text-gray-400 text-xs">Xóa</button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-8 justify-between w-full md:w-auto">
                                <div className="hidden md:block text-right">
                                  <span className="text-gray-400 text-[10px] font-bold uppercase block mb-1">Đơn giá</span>
                                  <span className="text-[#ee4d2d] font-black">₫{item.price?.toLocaleString("vi-VN")}</span>
                                </div>

                                <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                                  <button 
                                    onClick={() => updateQuantity(cartIndex, item.quantity - 1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 font-black"
                                  >
                                    −
                                  </button>
                                  <div className="w-12 h-10 flex items-center justify-center font-black text-sm border-x border-gray-100 text-gray-800">
                                    {item.quantity}
                                  </div>
                                  <button 
                                    onClick={() => updateQuantity(cartIndex, item.quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 font-black"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="hidden md:block">
                                  <button 
                                    onClick={() => removeFromCart(cartIndex)}
                                    className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                                    title="Xóa sản phẩm"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Summary */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 mt-8 sticky bottom-4 z-50 border border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tổng cộng thanh toán</p>
                      <div className="flex items-baseline gap-1">
                         <span className="text-4xl font-black text-[#ee4d2d]">₫{cartTotal.toLocaleString("vi-VN")}</span>
                         <span className="text-xs text-gray-400 font-bold">(Đã bao gồm VAT)</span>
                      </div>
                      <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-tighter">✨ Miễn phí vận chuyển cho đơn hàng từ 250k</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <Link href="/" className="flex-1 md:flex-none text-center bg-gray-50 text-gray-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all">
                        TÌM THÊM
                      </Link>
                      <button 
                        onClick={() => router.push('/checkout')}
                        className="flex-[2] md:flex-none bg-[#ee4d2d] text-white px-16 py-5 rounded-2xl font-black text-sm shadow-xl shadow-red-200 hover:bg-[#d73211] transition-all uppercase tracking-widest"
                      >
                        ĐẶT HÀNG NGAY ➜
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===== TAB 2: ĐƠN HÀNG CỦA TÔI ===== */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-[3rem] shadow-xl shadow-gray-200/30 border border-gray-100 overflow-hidden">
            
            {!savedPhone ? (
              <div className="p-12 md:p-20 text-center max-w-xl mx-auto">
                <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner border border-green-100">
                  📲
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Tra cứu nhanh</h2>
                <p className="text-gray-500 mb-10 text-sm">Nhập số điện thoại khi đặt hàng để theo dõi trạng thái vận chuyển và lịch sử mua sắm của bà con.</p>
                <form onSubmit={handlePhoneSubmit} className="flex flex-col md:flex-row gap-4">
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-xl font-black text-center tracking-widest focus:bg-white focus:ring-4 focus:ring-green-100 focus:border-[#1a5c2a] outline-none transition-all"
                    placeholder="0xxx xxx xxx"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loadingOrders}
                    className="bg-[#1a5c2a] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#2d7a3e] transition-all shadow-xl shadow-green-200 disabled:opacity-50 uppercase text-xs tracking-widest"
                  >
                    {loadingOrders ? 'ĐANG TÌM...' : 'KIỂM TRA'}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="p-6 bg-gradient-to-r from-[#1a5c2a] to-[#2d7a3e] text-white flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-lg border border-white/20">
                      {savedPhone.slice(-2)}
                    </div>
                    <div>
                      <p className="font-black text-base leading-tight">Khách hàng: {savedPhone}</p>
                      <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Hệ thống đã ghi nhận {orders.length} đơn hàng</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
                    Thoát
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="p-20 text-center">
                    <div className="text-8xl mb-8 opacity-10 filter grayscale">🏜️</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Không tìm thấy đơn hàng</h3>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">Vui lòng kiểm tra lại số điện thoại hoặc liên hệ tổng đài hỗ trợ: 0773.440.966</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    {orders.map((order: any) => (
                      <Link
                        key={order._id}
                        href={`/don-hang/${order.orderCode}`}
                        className="block p-5 bg-white rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                             <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">🛒</div>
                             <div>
                                <p className="font-black text-[#1a5c2a] text-sm tracking-tight">Mã đơn: {order.orderCode}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                  {new Date(order.createdAt).toLocaleDateString('vi-VN')} • {new Date(order.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                             </div>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.orderStatus)} shadow-sm`}>
                            {order.orderStatus}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-50">
                          <div className="flex -space-x-3">
                            {order.orderItems.slice(0, 3).map((item: any, idx: number) => (
                              <div key={idx} className="w-12 h-12 rounded-xl border-4 border-white bg-white shadow-sm overflow-hidden flex-shrink-0">
                                {item.image ? <img src={item.image} className="w-full h-full object-cover" alt="" /> : <span className="flex items-center justify-center h-full text-xs">📦</span>}
                              </div>
                            ))}
                            {order.orderItems.length > 3 && (
                              <div className="w-12 h-12 rounded-xl border-4 border-white bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 flex-shrink-0 shadow-sm">
                                +{order.orderItems.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-600 truncate uppercase tracking-tight">
                              {order.orderItems.map((i: any) => i.name).join(', ')}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Tổng cộng</p>
                            <p className="font-black text-red-600">₫{order.totalPrice?.toLocaleString('vi-VN')}</p>
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
