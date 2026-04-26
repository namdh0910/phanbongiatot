"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/utils/api';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get('code');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderCode) {
      fetch(`${API_BASE_URL}/orders/${orderCode}`)
        .then(res => res.json())
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [orderCode]);

  if (loading) return <div className="p-20 text-center font-bold">Đang tải thông tin đơn hàng...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 text-center border border-gray-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 animate-bounce">
            ✅
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase italic">Đặt hàng thành công!</h1>
          <p className="text-gray-500 mb-8 text-lg font-medium">Cảm ơn anh/chị đã tin tưởng giải pháp của Phân Bón Giá Tốt.</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10 text-left border border-gray-100">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Mã đơn hàng</span>
              <span className="text-[#ee4d2d] font-black text-xl">{orderCode}</span>
            </div>
            
            {order && (
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Người nhận:</span>
                  <span className="font-bold text-gray-800">{order.customerInfo?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Số điện thoại:</span>
                  <span className="font-bold text-gray-800">{order.customerInfo?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tổng thanh toán:</span>
                  <span className="font-black text-lg text-[#1a5c2a]">{order.totalPrice?.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phương thức:</span>
                  <span className="font-bold text-gray-800">{order.paymentMethod}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 mb-10">
            <p className="text-emerald-800 font-bold flex items-center justify-center gap-2">
              <span className="text-xl">📞</span> Kỹ sư sẽ gọi xác nhận trong 30 phút
            </p>
            <p className="text-emerald-600 text-xs mt-2">Vui lòng để ý điện thoại để chúng tôi sớm chuyển hàng đến vườn.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/san-pham" className="bg-[#1a5c2a] text-white px-10 py-4 rounded-xl font-black shadow-lg hover:bg-[#2d7a3e] transition-all">
               TIẾP TỤC MUA SẮM ➜
            </Link>
            <Link href="/tra-cuu-don-hang" className="bg-white text-[#1a5c2a] border-2 border-[#1a5c2a] px-10 py-4 rounded-xl font-black hover:bg-green-50 transition-all">
               TRA CỨU ĐƠN HÀNG
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Đang tải...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
