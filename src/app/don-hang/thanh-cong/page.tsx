"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 mx-4">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner">
        ✓
      </div>
      <h1 className="text-3xl font-black text-gray-900 mb-2">Đặt hàng thành công!</h1>
      <p className="text-gray-600 mb-8">
        Cảm ơn bạn đã tin tưởng Phân Bón Giá Tốt. Kỹ sư của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
      </p>
      
      {code && (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 space-y-4">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Mã đơn hàng</p>
            <p className="text-3xl font-black text-[#1a5c2a] tracking-wider">{code}</p>
          </div>

          {searchParams.get('method') === 'Chuyển khoản' && (
            <div className="pt-6 border-t border-gray-200">
               <p className="text-xs font-black text-gray-800 uppercase mb-4 italic">Anh/chị vui lòng Quét mã để thanh toán đơn hàng</p>
               <div className="bg-white p-4 rounded-2xl border-2 border-[#1a5c2a]/20 inline-block shadow-sm">
                  <img 
                    src={`https://img.vietqr.io/image/MB-0773440966-compact2.png?amount=${searchParams.get('total') || 0}&addInfo=${code}&accountName=PHAN%20BON%20GIA%20TOT`} 
                    alt="VietQR Payment"
                    className="w-64 h-auto mx-auto"
                  />
               </div>
               <div className="mt-4 text-[10px] text-gray-500 font-medium space-y-1">
                  <p>Ngân hàng: <span className="font-black text-gray-900">MB Bank</span></p>
                  <p>Số tài khoản: <span className="font-black text-gray-900">0773 440 966</span></p>
                  <p>Nội dung: <span className="font-black text-[#1a5c2a]">{code}</span></p>
               </div>
            </div>
          )}
          
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter pt-4">Lưu lại mã này để tra cứu tình trạng đơn hàng.</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/don-hang/${code || ''}`} className="px-6 py-3 bg-[#1a5c2a] text-white rounded-xl font-bold hover:bg-[#2d7a3e] transition-colors shadow-md flex-1">
          Theo dõi đơn hàng
        </Link>
        <Link href="/" className="px-6 py-3 bg-white text-[#1a5c2a] border-2 border-[#1a5c2a] rounded-xl font-bold hover:bg-green-50 transition-colors flex-1">
          Tiếp tục mua sắm
        </Link>
      </div>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
        <p className="font-bold mb-1">💡 Mẹo: Lưu lại mã đơn hàng phía trên!</p>
        <p>Bạn có thể tra cứu lại bất kỳ lúc nào tại <Link href="/tra-cuu-don-hang" className="font-black underline">phanbongiatot.com/tra-cuu-don-hang</Link></p>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-20 flex items-center justify-center">
      <Suspense fallback={<div className="p-10 text-center">Đang tải thông tin đơn hàng...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
