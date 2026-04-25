"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/api';
import Breadcrumbs from '@/components/Breadcrumbs';

function TrackingResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams?.get('code');
  const phone = searchParams?.get('phone');
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!code || !phone) {
        setError('Thiếu mã đơn hàng hoặc số điện thoại');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/orders/track?code=${code}&phone=${phone}`);
        const data = await res.json();
        
        if (res.ok) {
          setOrder(data);
        } else {
          setError(data.message || 'Không tìm thấy đơn hàng');
        }
      } catch (err) {
        setError('Đã có lỗi xảy ra khi kết nối máy chủ');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [code, phone]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1a5c2a] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500">Đang tra cứu dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="text-6xl mb-6 opacity-30">❌</div>
          <h1 className="text-2xl font-black text-gray-900 mb-4">{error || 'Không tìm thấy đơn hàng'}</h1>
          <p className="text-gray-500 mb-8">Vui lòng kiểm tra lại mã đơn hàng (VD: PBG-...) và số điện thoại bạn đã dùng khi đặt hàng.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.back()}
              className="bg-[#1a5c2a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#2d7a3e] transition-colors"
            >
              Thử lại ngay
            </button>
            <Link href="/" className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
              Quay lại cửa hàng
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Breadcrumbs items={[{ label: 'Tra cứu', href: '/tra-cuu-don-hang' }, { label: order.orderCode }]} />
      
      <div className="container mx-auto px-4 max-w-4xl mt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Summary */}
          <div className="bg-[#1a5c2a] p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-green-200 text-xs uppercase tracking-widest font-black mb-1">Mã đơn hàng</p>
                <h1 className="text-3xl font-black">{order.orderCode}</h1>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                <p className="text-green-200 text-xs font-black uppercase mb-1">Trạng thái hiện tại</p>
                <p className="text-xl font-black uppercase tracking-wide">{order.orderStatus}</p>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
               <span className="text-xl">🚚</span> Hành trình đơn hàng
            </h2>
            
            <div className="relative">
              {/* Vertical line for mobile, Horizontal for desktop */}
              <div className="absolute left-[15px] md:left-0 md:top-4 md:w-full md:h-0.5 h-full w-0.5 bg-gray-200 z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {order.timeline.map((step: any, idx: number) => (
                  <div key={idx} className="flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-500 ${step.isDone ? 'bg-[#1a5c2a] border-[#1a5c2a] text-white shadow-lg shadow-green-100' : 'bg-white border-gray-300 text-gray-300'}`}>
                      {step.isDone ? '✓' : idx + 1}
                    </div>
                    <div className="md:text-center">
                      <p className={`font-black text-sm ${step.isDone ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                      {step.isDone && (
                        <p className="text-[10px] text-gray-500 mt-0.5">
                           {new Date(step.date).toLocaleDateString('vi-VN')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
             {/* Customer Info */}
             <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/30">
               <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                 <span className="text-lg">📍</span> Thông tin nhận hàng
               </h3>
               <div className="space-y-4">
                 <div>
                   <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Người nhận</p>
                   <p className="font-bold text-gray-800">{order.customerInfo.name}</p>
                 </div>
                 <div>
                   <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Địa chỉ</p>
                   <p className="font-bold text-gray-800 leading-relaxed">{order.customerInfo.address}</p>
                 </div>
                 {order.shippingCode && (
                   <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 inline-block">
                     <p className="text-[10px] uppercase font-black text-emerald-600 tracking-widest">Mã vận đơn</p>
                     <p className="font-black text-[#1a5c2a]">{order.shippingCode}</p>
                   </div>
                 )}
               </div>
             </div>

             {/* Order Items */}
             <div className="p-8">
               <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                 <span className="text-lg">🛒</span> Sản phẩm đã đặt
               </h3>
               <div className="space-y-3">
                 {order.orderItems.map((item: any, idx: number) => (
                   <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 truncate mr-4">{item.name} <span className="text-gray-400 text-xs">x{item.qty}</span></span>
                      <span className="font-bold text-gray-900 whitespace-nowrap">{(item.price * item.qty).toLocaleString()}đ</span>
                   </div>
                 ))}
                 <div className="pt-3 border-t border-dashed flex justify-between items-center mt-4">
                    <span className="font-black text-gray-900">Tổng thanh toán</span>
                    <span className="text-xl font-black text-[#ee4d2d]">{order.totalPrice.toLocaleString()}đ</span>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="mt-12 text-center">
           <Link href="/tra-cuu-don-hang" className="text-[#1a5c2a] font-bold hover:underline flex items-center justify-center gap-2">
             ← Tra cứu mã khác
           </Link>
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <TrackingResults />
    </Suspense>
  );
}
