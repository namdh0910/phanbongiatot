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

  const shippingFee = cartTotal > 500000 ? 0 : 30000;
  const totalPrice = cartTotal + shippingFee;

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
          totalPrice
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
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Hãy chọn những sản phẩm phân bón tốt nhất cho vườn cây của bạn nhé!</p>
        <Link href="/san-pham" className="bg-[#1a5c2a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2d7a3e] transition-colors shadow-lg">
          Tiếp tục mua sắm
        </Link>
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
                    <input type="text" required value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Nhập họ và tên..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                    <input type="tel" required value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Nhập số điện thoại..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Địa chỉ cụ thể (Số nhà, đường, ấp/thôn) <span className="text-red-500">*</span></label>
                  <input type="text" required value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Ví dụ: Số 12, Ấp 3..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tỉnh/Thành phố</label>
                    <input type="text" value={customer.province} onChange={e => setCustomer({...customer, province: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Tỉnh/Thành..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Quận/Huyện</label>
                    <input type="text" value={customer.district} onChange={e => setCustomer({...customer, district: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Quận/Huyện..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phường/Xã</label>
                    <input type="text" value={customer.ward} onChange={e => setCustomer({...customer, ward: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all" placeholder="Phường/Xã..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ghi chú đơn hàng (Tùy chọn)</label>
                  <textarea value={customer.note} onChange={e => setCustomer({...customer, note: e.target.value})} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none transition-all resize-none h-24" placeholder="Ghi chú thêm về thời gian giao hàng, chỉ dẫn đường đi..."></textarea>
                </div>
              </div>
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
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-medium">{cartTotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium">{shippingFee === 0 ? <span className="text-green-600">Miễn phí</span> : `${shippingFee.toLocaleString('vi-VN')}đ`}</span>
                </div>
                {shippingFee > 0 && (
                  <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded text-center">
                    Mua thêm {(500000 - cartTotal).toLocaleString('vi-VN')}đ để được FREESHIP
                  </div>
                )}
                
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
