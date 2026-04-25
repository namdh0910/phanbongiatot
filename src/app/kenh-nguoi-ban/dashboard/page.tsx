"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";

export default function VendorDashboard() {
  const [vendor, setVendor] = useState<any>(null);
  const [stats, setStats] = useState({
    active: 0,
    pending: 0,
    rejected: 0,
    newOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const info = localStorage.getItem("vendorInfo");
    const token = localStorage.getItem("vendorToken");
    
    if (!token || !info) {
      router.push("/kenh-nguoi-ban/dang-nhap");
      return;
    }

    try {
      const parsedInfo = JSON.parse(info);
      setVendor(parsedInfo);
      fetchStats(token);
    } catch (e) {
      router.push("/kenh-nguoi-ban/dang-nhap");
    }
  }, []);

  const fetchStats = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/vendor/stats`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorInfo");
    router.push("/kenh-nguoi-ban/dang-nhap");
  };

  if (loading && !vendor) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-green-200 rounded-full"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Đang tải dữ liệu...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* Top Header */}
      <div className="bg-[#1a5c2a] text-white pt-10 pb-20 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              🏪
            </div>
            <div>
              <h1 className="text-xl font-black">Xin chào, {vendor?.storeName || "Đại lý"}</h1>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-widest">Kênh Người Bán Phân Bón Giá Tốt</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl hover:bg-red-500 transition-all">
            🚪
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Đang bán", val: stats.active, color: "text-emerald-600", bg: "bg-white" },
            { label: "Chờ duyệt", val: stats.pending, color: "text-orange-500", bg: "bg-white" },
            { label: "Từ chối", val: stats.rejected, color: "text-red-500", bg: "bg-white" },
            { label: "Đơn mới", val: stats.newOrders, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" }
          ].map((card, i) => (
            <div key={i} className={`p-6 rounded-[2rem] shadow-sm border border-gray-100 ${card.bg}`}>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">{card.label}</p>
               <p className={`text-3xl font-black ${card.color}`}>{card.val}</p>
            </div>
          ))}
        </div>

        {/* Action Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
           <Link href="/kenh-nguoi-ban/san-pham/them-moi" className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200 hover:border-[#1a5c2a] hover:bg-green-50/30 transition-all group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">➕</div>
              <h3 className="text-xl font-black text-gray-800">Đăng sản phẩm mới</h3>
              <p className="text-gray-400 text-sm mt-1 font-medium">Bắt đầu đưa sản phẩm của anh/chị tiếp cận hàng ngàn nhà vườn.</p>
           </Link>

           <Link href="/kenh-nguoi-ban/don-hang" className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform"></div>
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-black text-gray-800">Quản lý đơn hàng</h3>
              <p className="text-gray-400 text-sm mt-1 font-medium">Theo dõi và xử lý đơn hàng từ khách hàng nhanh chóng.</p>
           </Link>
        </div>

        {/* Notifications / Alerts */}
        {stats.newOrders > 0 && (
          <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-[2.5rem] flex items-center justify-between shadow-lg shadow-orange-100 animate-in fade-in zoom-in duration-300">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl animate-bounce">
                   📦
                </div>
                <div>
                   <h4 className="font-black text-orange-900 text-lg uppercase tracking-tight">Cần xử lý ngay!</h4>
                   <p className="text-orange-700 text-sm font-medium">Anh/chị đang có {stats.newOrders} đơn hàng mới đang chờ xác nhận.</p>
                </div>
             </div>
             <Link href="/kenh-nguoi-ban/don-hang" className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-black text-xs hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all active:scale-95">
                XEM NGAY
             </Link>
          </div>
        )}
      </div>

      {/* Bottom Nav Mobile (Optional) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 py-3 px-6 md:hidden flex justify-around items-center z-50">
          <Link href="/kenh-nguoi-ban/dashboard" className="flex flex-col items-center text-[#1a5c2a]">
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Tổng quan</span>
          </Link>
          <Link href="/kenh-nguoi-ban/san-pham" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">📦</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Sản phẩm</span>
          </Link>
          <Link href="/kenh-nguoi-ban/don-hang" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🛒</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Đơn hàng</span>
          </Link>
          <Link href="/kenh-nguoi-ban/tai-khoan" className="flex flex-col items-center text-gray-400">
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-bold mt-1 uppercase">Tài khoản</span>
          </Link>
      </div>
    </div>
  );
}
