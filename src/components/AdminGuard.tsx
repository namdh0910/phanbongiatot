"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("adminToken") : null;
    if (!token) {
      console.log("No admin token found, redirecting to login...");
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600 mb-6"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Đang kiểm tra quyền truy cập...</h2>
        <p className="text-gray-500">Vui lòng đợi trong giây lát hoặc hệ thống sẽ tự động chuyển về trang đăng nhập.</p>
        <button 
          onClick={() => router.push('/admin/login')}
          className="mt-6 text-emerald-600 font-bold hover:underline"
        >
          Bấm vào đây nếu không tự động chuyển hướng
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
