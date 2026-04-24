"use client";
import { useState, useEffect } from "react";

export default function AdminApproveProducts() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">TRANG DUYỆT SẢN PHẨM (ĐANG KIỂM TRA)</h1>
      <p className="mt-4 text-gray-600">Nếu anh thấy dòng này, nghĩa là trang đã tải thành công. Em sẽ nạp lại dữ liệu ngay sau đây ạ.</p>
    </div>
  );
}
