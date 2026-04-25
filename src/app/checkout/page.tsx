"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { API_BASE_URL } from '@/utils/api';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [error, setError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState({ type: '', text: '' });

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponMsg({ type: '', text: '' });
    try {
      const res = await fetch(`${API_BASE_URL}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), orderAmount: cartTotal })
      });
      const data = await res.json();
      if (res.ok) {
        setAppliedCoupon(data);
        setCouponMsg({ type: 'success', text: 'Áp dụng mã giảm giá thành công!' });
      } else {
        setAppliedCoupon(null);
        setCouponMsg({ type: 'error', text: data.message });
      }
    } catch {
      setCouponMsg({ type: 'error', text: 'Lỗi kết nối máy chủ' });
    } finally {
      setCouponLoading(false);
    }
  };

  const discountAmount = appliedCoupon 
    ? (appliedCoupon.discountType === 'percentage' 
        ? (cartTotal * appliedCoupon.discountValue / 100) 
        : appliedCoupon.discountValue)
    : 0;

  const shippingFee = 0; // Luôn miễn phí ship theo yêu cầu của anh
  const totalPrice = cartTotal + shippingFee - discountAmount;
  
  console.log("Checkout version: 1.1 - Free Ship & Coupon UI V2");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) {
      setError('Vui lòng điền đầy đủ tên, số điện thoại và địa chỉ nhận hàng.');
      return;
    }
    
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    if (!phoneRegex.test(customer.phone.replace(/\s/g, ''))) {
      setError('Số điện thoại không hợp lệ (cần 10 số, đầu 03,05,07,08,09).');
      return;
    }

    setLoading(true);
    setError('');

    const orderItems = cart.map(item => ({
      name: item.name,
      qty: item.quantity,
      image: item.images[0] || '',
      price: item.price,
      product: item._id
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems,
          customerInfo: customer,
          paymentMethod,
          itemsPrice: cartTotal,
          shippingFee,
          totalPrice,
          couponCode: appliedCoupon?.code || null,
          discountAmount
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Lỗi khi đặt hàng');
      }

      const orderData = await res.json();
      // Save order code to localStorage for customer order lookup
      try {
        const saved = JSON.parse(localStorage.getItem('pbgt_orders') || '[]');
        saved.unshift({ code: orderData.orderCode, name: customer.name, total: totalPrice, date: new Date().toISOString() });
        localStorage.setItem('pbgt_orders', JSON.stringify(saved.slice(0, 20)));
        // Save phone number for automatic login to order history
        const cleanPhone = customer.phone.replace(/\s/g, '');
        localStorage.setItem('pbgt_phone', cleanPhone);
      } catch {}
      clearCart();
      window.location.href = `/don-hang/thanh-cong?code=${orderData.orderCode}`;
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    const bestSellers = [
      { _id: '1', name: "Acti Rooti - Siêu Kích Rễ", price: 180000, oldPrice: 220000, images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"], slug: "rooti-4339", sold: 1250 },
      { _id: '2', name: "Nemano Tuyến Trùng", price: 180000, oldPrice: 210000, images: ["https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop"], slug: "nemano-9989", sold: 890 },
      { _id: '3', name: "Amino Acid - Xanh Lá", price: 99000, oldPrice: 150000, images: ["https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800&auto=format&fit=crop"], slug: "amino-acid-7822", sold: 2100 },
      { _id: '4', name: "Combi Gold Vi Lượng", price: 45000, oldPrice: 60000, images: ["https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop"], slug: "combi-gold-1223", sold: 1560 }
    ];

    const combos = [
      { name: "Combo Phục Hồi Sầu Riêng", price: 1160000, discount: "Tiết kiệm 290k", slug: "combo-sau-rieng-phuc-hoi" },
      { name: "Gói Cà Phê Năng Suất Vàng", price: 784000, discount: "Tiết kiệm 196k", slug: "combo-ca-phe-nang-suat-vang" }
    ];

    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-16">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase">Giỏ hàng đang chờ anh/chị</h1>
            <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">Chưa có sản phẩm nào được chọn. Hãy tham khảo những giải pháp bán chạy nhất bên dưới nhé!</p>
            <Link href="/san-pham" className="inline-block bg-[#f5a623] text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl hover:bg-[#fbb940] transition-all hover:-translate-y-1">
              XEM SẢN PHẨM BÁN CHẠY ➜
            </Link>
          </div>

          <div className="space-y-16">
            {/* Best Sellers Section */}
            <div>
              <div className="flex items-center justify-between mb-8 border-l-4 border-[#1a5c2a] pl-4">
                <h3 className="text-2xl font-black text-gray-800 uppercase italic">Sản phẩm bán chạy nhất</h3>
                <Link href="/san-pham" className="text-sm font-bold text-[#1a5c2a] hover:underline">Xem tất cả</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bestSellers.map(p => (
                  <Link key={p._id} href={`/san-pham/${p.slug}`} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-[#1a5c2a] hover:bg-white hover:shadow-xl transition-all group">
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1 line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-gray-400 mb-2">Đã bán {p.sold}+</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#ee4d2d] font-black text-lg">{p.price.toLocaleString('vi-VN')}đ</span>
                        <span className="text-gray-400 line-through text-xs">{p.oldPrice.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>
                    <div className="text-[#1a5c2a] text-xl font-black pr-2 group-hover:translate-x-1 transition-transform">➜</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Combo Section */}
            <div className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 uppercase italic">Tiết kiệm hơn với Combo</h3>
                <p className="text-emerald-200 mb-8 font-medium">Giải pháp toàn diện cho vườn cây, tiết kiệm đến 25%</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {combos.map((c, i) => (
                    <Link key={i} href={`/san-pham/${c.slug}`} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-lg leading-tight max-w-[200px]">{c.name}</h4>
                        <span className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-black uppercase tracking-wider">{c.discount}</span>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-2xl font-black text-white">{c.price.toLocaleString('vi-VN')}đ</span>
                        <span className="bg-white text-[#1a5c2a] px-4 py-2 rounded-lg font-black text-xs">MUA NGAY</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Thanh toán</h1>
          <p className="text-gray-500">Hoàn tất đơn hàng của bạn</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm">
            <p className="font-bold">Lỗi</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Cột trái: Thông tin nhận hàng */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">📍</span> Thông tin nhận hàng
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                    <input type="text" required value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Nhập họ và tên..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                    <input type="tel" required value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Nhập số điện thoại..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Địa chỉ cụ thể (Số nhà, đường, ấp/thôn) <span className="text-red-500">*</span></label>
                  <input type="text" required value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Ví dụ: Số 12, Ấp 3..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tỉnh/Thành phố</label>
                    <input type="text" value={customer.province} onChange={e => setCustomer({...customer, province: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Tỉnh/Thành..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Quận/Huyện</label>
                    <input type="text" value={customer.district} onChange={e => setCustomer({...customer, district: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Quận/Huyện..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phường/Xã</label>
                    <input type="text" value={customer.ward} onChange={e => setCustomer({...customer, ward: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Phường/Xã..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ghi chú đơn hàng (Tùy chọn)</label>
                  <textarea value={customer.note} onChange={e => setCustomer({...customer, note: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all resize-none h-24" placeholder="Ghi chú thêm về thời gian giao hàng, chỉ dẫn đường đi..."></textarea>
                </div>
              </div>
            </div>

            {/* MÃ GIẢM GIÁ - CARD RIÊNG BIỆT ĐỂ KHÔNG BỊ SÓT */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-dashed border-green-200 bg-green-50/30">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎟️</span> Anh/chị có mã giảm giá?
              </h3>
              <p className="text-sm text-gray-500 mb-4">Nhập mã giảm giá của anh/chị tại đây để được ưu đãi tốt nhất.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode} 
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-[#1a5c2a] outline-none shadow-sm bg-white" 
                  placeholder="Ví dụ: CHAOXUAN2026..." 
                />
                <button 
                  type="button" 
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponCode.trim()}
                  className="bg-[#1a5c2a] text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-[#2d7a3e] transition-all shadow-md disabled:opacity-50"
                >
                  {couponLoading ? '...' : 'ÁP DỤNG'}
                </button>
              </div>
              {couponMsg.text && (
                <div className={`mt-3 p-3 rounded-lg text-sm font-bold ${couponMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                  {couponMsg.text}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">💳</span> Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-[#1a5c2a] bg-green-50/50' : 'border-gray-200 hover:border-[#1a5c2a]'}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-[#1a5c2a] focus:ring-[#1a5c2a]" />
                  <div>
                    <p className="font-bold text-gray-800">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-gray-500">Khách hàng kiểm tra hàng rồi mới thanh toán</p>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'Chuyển khoản' ? 'border-[#1a5c2a] bg-green-50/50' : 'border-gray-200 hover:border-[#1a5c2a]'}`}>
                  <input type="radio" name="payment" value="Chuyển khoản" checked={paymentMethod === 'Chuyển khoản'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-[#1a5c2a] focus:ring-[#1a5c2a]" />
                  <div>
                    <p className="font-bold text-gray-800">Chuyển khoản qua ngân hàng</p>
                    <p className="text-sm text-gray-500">Nhận thông tin tài khoản sau khi đặt hàng</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Cột phải: Tổng kết đơn hàng */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">📋</span> Tóm tắt đơn hàng
              </h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, idx) => (
                  <div key={`${item._id}-${idx}`} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-16 h-16 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
                      {item.images[0] ? (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-1">{item.name}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">SL: {item.quantity}</span>
                        <span className="font-bold text-[#1a5c2a]">{item.price.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                {/* Coupon Section removed from here */}

                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-medium">{cartTotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="font-bold text-green-600">Miễn phí ship</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-600 font-bold">
                    <span>Giảm giá ({appliedCoupon?.code})</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                {/* Free ship message removed */}
                
                <div className="flex justify-between items-end pt-4 mt-4 border-t border-gray-100">
                  <span className="font-bold text-gray-800">Tổng cộng</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-red-600 block">{totalPrice.toLocaleString('vi-VN')}đ</span>
                    <span className="text-xs text-gray-500">(Đã bao gồm VAT nếu có)</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-8 bg-[#f5a623] text-white py-4 rounded-xl font-black text-lg hover:bg-[#fbb940] transition-colors shadow-lg disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang xử lý...
                  </>
                ) : (
                  'ĐẶT HÀNG NGAY'
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>🔒</span> Thông tin được bảo mật an toàn
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
