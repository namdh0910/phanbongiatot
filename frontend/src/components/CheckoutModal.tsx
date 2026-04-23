import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
"use client";
import { useState, useEffect } from "react";
import { trackEvent } from "@/utils/analytics";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
  product?: any; 
  isOpen: boolean;
  onClose: () => void;
  isFullCart?: boolean; 
  initialQuantity?: number;
}

export default function CheckoutModal({ product, isOpen, onClose, isFullCart = false, initialQuantity = 1 }: CheckoutModalProps) {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const { cart, clearCart, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: initialQuantity,
    note: ""
  });

  useEffect(() => {
    if (isOpen && !isFullCart) {
      setFormData(prev => ({ ...prev, quantity: initialQuantity }));
    }
  }, [isOpen, initialQuantity, isFullCart]);

  if (!isOpen) return null;

  const orderItems = isFullCart ? cart : (product ? [{
    productId: product._id,
    name: product.name,
    price: product.price,
    quantity: formData.quantity
  }] : []);

  const total = isFullCart ? cartTotal : (product ? product.price * formData.quantity : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: orderItems,
      totalAmount: total,
      source: isFullCart ? 'Cart Checkout' : `Single: ${product.name}`,
      note: formData.note
    };

    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        trackEvent('Purchase', {
          value: total,
          currency: 'VND',
          items_count: orderItems.length
        });
        if (isFullCart) clearCart();
        setStep(2);
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline!");
      }
    } catch (error) {
      alert("Lỗi kết nối. Vui lòng gọi hotline để đặt hàng nhanh!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {step === 1 ? (
          <>
            <div className="bg-[#ee4d2d] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg uppercase tracking-wider">Thông tin nhận hàng</h3>
              <button onClick={onClose} className="text-2xl hover:rotate-90 transition-transform">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-sm border border-gray-100 mb-4 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Đơn hàng của bạn</p>
                {orderItems.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700 line-clamp-1 flex-1">{item.name} x{item.quantity}</span>
                    <span className="font-bold text-gray-900 ml-4">₫{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-[#ee4d2d]">
                  <span>TỔNG CỘNG:</span>
                  <span>₫{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Họ tên *</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-sm px-4 py-2.5 outline-none focus:border-[#ee4d2d] bg-gray-50" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Số điện thoại *</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-sm px-4 py-2.5 outline-none focus:border-[#ee4d2d] bg-gray-50" placeholder="07xx xxx xxx" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Địa chỉ nhận hàng *</label>
                  <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-gray-200 rounded-sm px-4 py-2.5 outline-none focus:border-[#ee4d2d] bg-gray-50" placeholder="Số nhà, đường, xã, huyện, tỉnh..." />
                </div>
                {!isFullCart && (
                   <div className="flex items-center justify-between bg-white p-3 border border-gray-100 rounded-sm">
                     <span className="text-sm font-bold">Số lượng:</span>
                     <div className="flex border border-gray-200 rounded-sm">
                       <button type="button" onClick={() => setFormData(f => ({...f, quantity: Math.max(1, f.quantity - 1)}))} className="px-3 py-1 border-r border-gray-200">-</button>
                       <input type="text" value={formData.quantity} readOnly className="w-10 text-center text-sm font-bold" />
                       <button type="button" onClick={() => setFormData(f => ({...f, quantity: f.quantity + 1}))} className="px-3 py-1 border-l border-gray-200">+</button>
                     </div>
                   </div>
                )}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Ghi chú (nếu có)</label>
                  <textarea value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full border border-gray-200 rounded-sm px-4 py-2.5 outline-none focus:border-[#ee4d2d] bg-gray-50 resize-none" rows={2} />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#ee4d2d] text-white py-4 rounded-sm font-black text-lg shadow-lg hover:bg-[#d73211] transition-all disabled:bg-gray-400 mt-2">
                {loading ? "ĐANG GỬI..." : "XÁC NHẬN ĐẶT HÀNG"}
              </button>
              <p className="text-[10px] text-center text-gray-400 italic">Nhận hàng kiểm tra mới thanh toán (COD)</p>
            </form>
          </>
        ) : (
          <div className="p-10 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto">✓</div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">ĐẶT HÀNG THÀNH CÔNG!</h3>
              <p className="text-gray-600 text-sm">Cảm ơn anh/chị đã tin tưởng Phân Bón Giá Tốt.</p>
              <p className="text-[#ee4d2d] font-bold mt-4">Kỹ sư sẽ gọi điện xác nhận đơn hàng ngay bây giờ ạ!</p>
            </div>
            <button onClick={onClose} className="w-full bg-gray-900 text-white py-3 rounded-sm font-bold">XONG</button>
          </div>
        )}
      </div>
    </div>
  );
}
