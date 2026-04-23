export default function AdminOrders() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Quản Lý Đơn Hàng</h1>
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-2xl mx-auto mt-20">
        <span className="text-8xl mb-6 block drop-shadow-md">🛒</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Khu Vực Xử Lý Đơn Hàng</h2>
        <p className="text-gray-600 text-lg">Chức năng Giỏ Hàng & Thanh Toán đang được hoàn thiện. Trong tương lai, khi khách hàng đặt mua trên web, đơn hàng sẽ tự động nhảy vào đây kèm theo thông báo đẩy.</p>
        <button className="mt-8 bg-gray-100 text-gray-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed">Đang phát triển (Giai đoạn 2)</button>
      </div>
    </div>
  );
}
