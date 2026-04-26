"use client";
import { useState, useEffect, useMemo } from 'react';
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

  // Group items by seller for summary
  const groupedItems = useMemo(() => {
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

  const shippingFee = cartTotal >= 250000 ? 0 : 30000;
  const discountAmount = appliedCoupon 
    ? (appliedCoupon.discountType === 'percentage' 
        ? (cartTotal * appliedCoupon.discountValue / 100) 
        : appliedCoupon.discountValue)
    : 0;

  const totalPrice = cartTotal + shippingFee - discountAmount;

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
      product: item._id,
      selectedVariant: item.selectedVariant
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

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Lỗi khi đặt hàng');
      }

      // Save order code to localStorage
      try {
        const orderCode = data.order?.orderCode || data.orderCode;
        const saved = JSON.parse(localStorage.getItem('pbgt_orders') || '[]');
        saved.unshift({ code: orderCode, name: customer.name, total: totalPrice, date: new Date().toISOString() });
        localStorage.setItem('pbgt_orders', JSON.stringify(saved.slice(0, 20)));
        localStorage.setItem('pbgt_phone', customer.phone.replace(/\s/g, ''));
      } catch {}
      
      clearCart();
      window.location.href = `/dat-hang-thanh-cong?code=${data.order?.orderCode || data.orderCode}`;
      
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?p=')
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.selectedOptions[0].getAttribute('data-code');
    const provinceName = e.target.value;
    setCustomer({ ...customer, province: provinceName, district: '', ward: '' });
    setDistricts([]);
    setWards([]);
    if (provinceCode) {
      const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await res.json();
      setDistricts(data.districts || []);
    }
  };

  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtCode = e.target.selectedOptions[0].getAttribute('data-code');
    const districtName = e.target.value;
    setCustomer({ ...customer, district: districtName, ward: '' });
    setWards([]);
    if (districtCode) {
      const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await res.json();
      setWards(data.wards || []);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-10">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">GIỎ HÀNG ĐANG TRỐNG</h1>
          <p className="text-gray-500 mb-8">Bà con chưa có sản phẩm nào để thanh toán.</p>
          <Link href="/" className="bg-[#1a5c2a] text-white px-10 py-4 rounded-xl font-bold">
            QUAY LẠI CỬA HÀNG ➜
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center md:text-left">
           <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Thanh toán 💳</h1>
           <p className="text-gray-500 mt-2">Điền thông tin và xác nhận đơn hàng của bà con</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 mb-8 rounded-2xl shadow-sm animate-shake">
            <p className="font-black mb-1 text-sm uppercase tracking-widest">Lỗi đặt hàng</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-10">
          {/* LEFT COLUMN: INFORMATION */}
          <div className="flex-1 space-y-8">
            {/* Delivery Info */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl">📍</div>
                 <h2 className="text-2xl font-black text-gray-800 tracking-tight">Thông tin nhận hàng</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Họ và tên người nhận</label>
                  <input type="text" required value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-[#1a5c2a] outline-none transition-all font-bold" placeholder="Tên của anh/chị..." />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Số điện thoại liên hệ</label>
                  <input type="tel" required value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-[#1a5c2a] outline-none transition-all font-black tracking-widest" placeholder="0xxx xxx xxx" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Tỉnh / Thành</label>
                  <select required value={customer.province} onChange={handleProvinceChange} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white outline-none font-bold text-sm">
                    <option value="">Chọn Tỉnh/Thành</option>
                    {provinces.map(p => <option key={p.code} value={p.name} data-code={p.code}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Quận / Huyện</label>
                  <select required value={customer.district} onChange={handleDistrictChange} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white outline-none font-bold text-sm">
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map(d => <option key={d.code} value={d.name} data-code={d.code}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phường / Xã</label>
                  <select required value={customer.ward} onChange={e => setCustomer({...customer, ward: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white outline-none font-bold text-sm">
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Địa chỉ cụ thể</label>
                <input type="text" required value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-[#1a5c2a] outline-none transition-all font-bold" placeholder="Số nhà, tên đường, ấp, thôn..." />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Ghi chú cho gian hàng</label>
                <textarea value={customer.note} onChange={e => setCustomer({...customer, note: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-[#1a5c2a] outline-none transition-all font-bold h-32 resize-none" placeholder="Lời nhắn về thời gian nhận hàng, chỉ dẫn đường..."></textarea>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl">💳</div>
                 <h2 className="text-2xl font-black text-gray-800 tracking-tight">Phương thức thanh toán</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'COD', label: 'Thanh toán COD', desc: 'Nhận hàng rồi mới trả tiền', icon: '🚚' },
                    { id: 'BANK_TRANSFER', label: 'Chuyển khoản', desc: 'Chuyển khoản qua ngân hàng', icon: '🏦' },
                    { id: 'MOMO', label: 'Ví MoMo', desc: 'Nhanh chóng & An toàn', icon: '💗' },
                    { id: 'VNPAY', label: 'VNPAY-QR', desc: 'Quét mã thanh toán', icon: '📲' }
                  ].map(method => (
                    <label key={method.id} className={`flex items-center gap-4 p-5 border-2 rounded-[1.5rem] cursor-pointer transition-all ${paymentMethod === method.id ? 'border-[#1a5c2a] bg-emerald-50/50' : 'border-gray-50 hover:border-emerald-200'}`}>
                      <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-[#1a5c2a]" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                           <span className="text-xl">{method.icon}</span>
                           <p className="font-black text-sm text-gray-800">{method.label}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{method.desc}</p>
                      </div>
                    </label>
                  ))}
               </div>

               {paymentMethod === 'BANK_TRANSFER' && (
                 <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-3xl animate-in fade-in slide-in-from-top-4">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Thông tin chuyển khoản</p>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                          <span className="text-sm font-bold text-blue-600">Ngân hàng</span>
                          <span className="text-sm font-black text-gray-800">VIETCOMBANK (VCB)</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                          <span className="text-sm font-bold text-blue-600">Số tài khoản</span>
                          <span className="text-xl font-black text-gray-900">0123.456.789</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                          <span className="text-sm font-bold text-blue-600">Chủ tài khoản</span>
                          <span className="text-sm font-black text-gray-800 uppercase">PHAN BONG GIA TOT</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-blue-600">Nội dung</span>
                          <span className="text-sm font-black text-[#ee4d2d]">PBGT [SĐT của bà con]</span>
                       </div>
                    </div>
                    <div className="mt-6 bg-white p-4 rounded-2xl text-[10px] text-gray-500 italic leading-relaxed">
                      Lưu ý: Đơn hàng sẽ được xử lý ngay sau khi hệ thống nhận được tiền. Anh/chị vui lòng chụp lại màn hình giao dịch để đối chiếu nếu cần.
                    </div>
                 </div>
               )}
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:w-[24rem] flex-shrink-0">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 sticky top-10 border border-gray-100">
              <h2 className="text-2xl font-black text-gray-800 mb-8 tracking-tight">Tóm tắt đơn hàng</h2>
              
              {/* Split by Shop */}
              <div className="space-y-8 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {groupedItems.map(([sellerId, { sellerName, items }]) => (
                  <div key={sellerId} className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{sellerName}</span>
                    </div>
                    {items.map((item, idx) => (
                      <div key={`${item._id}-${idx}`} className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-50 shadow-inner">
                          <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-gray-800 line-clamp-1 leading-snug">{item.name}</p>
                          {item.selectedVariant && <p className="text-[9px] text-[#ee4d2d] font-bold uppercase mt-0.5">{item.selectedVariant}</p>}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-400 font-bold text-[10px]">SL: {item.quantity}</span>
                            <span className="text-sm font-black text-gray-800">₫{item.price?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-gray-500">
                   <span className="text-[11px] font-bold uppercase tracking-widest">Tiền hàng</span>
                   <span className="font-black text-gray-800">₫{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                   <span className="text-[11px] font-bold uppercase tracking-widest">Phí vận chuyển</span>
                   <span className={`font-black ${shippingFee === 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                      {shippingFee === 0 ? 'MIỄN PHÍ' : `₫${shippingFee.toLocaleString()}`}
                   </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#ee4d2d]">
                    <span className="text-[11px] font-bold uppercase tracking-widest">Giảm giá</span>
                    <span className="font-black">-₫{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-8">
                     <span className="text-sm font-black text-gray-800 uppercase tracking-tight">Tổng thanh toán</span>
                     <div className="text-right">
                        <span className="text-4xl font-black text-[#ee4d2d] block leading-none tracking-tighter">₫{totalPrice.toLocaleString()}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">Đã bao gồm thuế phí</span>
                     </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#1a5c2a] text-white py-5 rounded-[1.5rem] font-black text-base shadow-xl shadow-green-100 hover:bg-[#2d7a3e] hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 uppercase tracking-widest"
                  >
                    {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG ➜'}
                  </button>
                  
                  <p className="mt-6 text-center text-[10px] text-gray-400 font-bold uppercase leading-relaxed max-w-[200px] mx-auto">
                    Bà con bậm nút để xác nhận đơn hàng. <span className="text-[#ee4d2d]">Phân bón giá tốt</span> cam kết chất lượng 100%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
