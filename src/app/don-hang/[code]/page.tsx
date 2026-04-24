import { API_BASE_URL } from '@/utils/api';
import Link from 'next/link';

async function getOrder(code: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${code}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const order = await getOrder(code);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy đơn hàng</h2>
        <p className="text-gray-500 mb-8">Mã đơn hàng không hợp lệ hoặc không tồn tại.</p>
        <Link href="/" className="bg-[#1a5c2a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2d7a3e] transition-colors shadow-lg">
          Về trang chủ
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Chờ xác nhận': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Đã xác nhận': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Đang giao': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Hoàn thành': return 'bg-green-100 text-green-800 border-green-200';
      case 'Đã hủy': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Chi tiết đơn hàng</h1>
            <p className="text-gray-500 font-bold mt-1">Mã: <span className="text-[#1a5c2a]">{order.orderCode}</span></p>
          </div>
          <div className={`px-4 py-2 rounded-full font-bold text-sm border ${getStatusColor(order.orderStatus)}`}>
            {order.orderStatus}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Danh sách sản phẩm</h2>
              <div className="space-y-4">
                {order.orderItems.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-100" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">Số lượng: {item.qty}</p>
                      <p className="font-bold text-[#1a5c2a] mt-1">{item.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Thông tin nhận hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Họ và tên</p>
                  <p className="font-bold text-gray-900">{order.customerInfo.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Số điện thoại</p>
                  <p className="font-bold text-gray-900">{order.customerInfo.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-500 mb-1">Địa chỉ giao hàng</p>
                  <p className="font-bold text-gray-900">
                    {order.customerInfo.address}
                    {order.customerInfo.ward ? `, ${order.customerInfo.ward}` : ''}
                    {order.customerInfo.district ? `, ${order.customerInfo.district}` : ''}
                    {order.customerInfo.province ? `, ${order.customerInfo.province}` : ''}
                  </p>
                </div>
                {order.customerInfo.note && (
                  <div className="sm:col-span-2">
                    <p className="text-gray-500 mb-1">Ghi chú</p>
                    <p className="font-bold text-gray-900 bg-yellow-50 p-3 rounded-lg border border-yellow-100">{order.customerInfo.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Thanh toán</h2>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="font-medium">{order.itemsPrice.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className="font-medium">{order.shippingFee === 0 ? 'Miễn phí' : `${order.shippingFee.toLocaleString('vi-VN')}đ`}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-bold">Tổng cộng</span>
                  <span className="text-xl font-black text-red-600">{order.totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold">Phương thức</p>
                <p className="font-bold text-gray-900 mb-3">{order.paymentMethod}</p>
                
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-bold">Trạng thái thanh toán</p>
                <p className={`font-bold ${order.paymentStatus === 'Đã thanh toán' ? 'text-green-600' : 'text-orange-600'}`}>
                  {order.paymentStatus}
                </p>
              </div>
            </div>
            
            <div className="bg-[#1a5c2a] text-white p-6 rounded-2xl shadow-md text-center">
              <p className="text-3xl mb-2">📞</p>
              <p className="font-bold mb-2">Cần hỗ trợ?</p>
              <p className="text-sm text-green-100 mb-4">Gọi ngay cho chúng tôi nếu bạn cần thay đổi thông tin đơn hàng</p>
              <a href="tel:0773440966" className="inline-block bg-white text-[#1a5c2a] px-6 py-2 rounded-lg font-black hover:bg-green-50 transition-colors">
                0773.440.966
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
