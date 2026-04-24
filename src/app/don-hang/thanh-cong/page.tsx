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
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <p className="text-sm text-gray-500 mb-1">Mã đơn hàng của bạn</p>
          <p className="text-2xl font-black text-[#1a5c2a] tracking-wider">{code}</p>
          <p className="text-xs text-gray-400 mt-2">Vui lòng lưu lại mã này để tra cứu tình trạng đơn hàng.</p>
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
