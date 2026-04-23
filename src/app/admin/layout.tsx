export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row absolute inset-0 z-[100]">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-dark text-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
          Admin <span className="text-primary">Panel</span>
        </h2>
        <ul className="space-y-4">
          <li><a href="/admin" className="text-gray-300 hover:text-white flex items-center gap-3 font-medium"><span className="text-xl">📊</span> Tổng quan & SP</a></li>
          <li><a href="/admin/leads" className="text-gray-300 hover:text-white flex items-center gap-3 font-medium"><span className="text-xl">👥</span> Khách Hàng (Leads)</a></li>
          <li><a href="/admin/orders" className="text-gray-300 hover:text-white flex items-center gap-3 font-medium"><span className="text-xl">🛒</span> Đơn Hàng</a></li>
          <li><a href="/admin/blog" className="text-gray-300 hover:text-white flex items-center gap-3 font-medium"><span className="text-xl">📝</span> Bài Viết (SEO)</a></li>
          <li className="pt-8"><a href="/" className="text-gray-400 hover:text-white flex items-center gap-3 text-sm">⬅️ Về trang chủ</a></li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-200 min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
