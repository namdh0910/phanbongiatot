"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TraCuuDonHangPage() {
  const [code, setCode] = useState('');
  const [savedOrders, setSavedOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pbgt_orders') || '[]');
      setSavedOrders(saved);
    } catch {}
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed) {
      router.push(`/don-hang/${trimmed}`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
            📦
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Tra Cứu Đơn Hàng</h1>
          <p className="text-gray-500 text-lg">Nhập mã đơn hàng để kiểm tra tình trạng giao hàng</p>
        </div>

        {/* Search box */}
        <form onSubmit={handleSearch} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Mã đơn hàng <span className="font-normal text-gray-400">(VD: PBG-260424-0001)</span>
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-lg font-bold focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none tracking-wider placeholder:font-normal placeholder:text-gray-300"
              placeholder="Nhập mã đơn hàng..."
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#1a5c2a] text-white px-6 py-3 rounded-xl font-black hover:bg-[#2d7a3e] transition-colors shadow-md whitespace-nowrap"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* Recent orders from localStorage */}
        {savedOrders.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-black text-gray-800 mb-5 flex items-center gap-2">
              <span className="text-xl">🕐</span> Đơn hàng gần đây trên thiết bị này
            </h2>
            <div className="space-y-3">
              {savedOrders.map((order: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/don-hang/${order.code}`}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-100 hover:border-green-200 transition-all group"
                >
                  <div>
                    <p className="font-black text-[#1a5c2a] tracking-wider group-hover:underline">{order.code}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {new Date(order.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{order.total?.toLocaleString('vi-VN')}đ</p>
                    <p className="text-sm text-emerald-600 font-bold mt-0.5">Xem chi tiết →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {savedOrders.length === 0 && (
          <div className="text-center text-gray-400 py-6">
            <p className="text-sm">Các đơn hàng bạn đặt sẽ được lưu tại đây để dễ tra cứu.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm mb-3">Cần hỗ trợ?</p>
          <a href="tel:0773440966" className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:border-[#1a5c2a] hover:text-[#1a5c2a] transition-colors shadow-sm">
            📞 Gọi: 0773.440.966
          </a>
        </div>
      </div>
    </div>
  );
}
