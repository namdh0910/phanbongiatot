"use client";
import { useState } from "react";
import Link from "next/link";
import CheckoutModal from "@/components/CheckoutModal";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCheckout = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
          <span className="text-[#ee4d2d]">🛒</span> GIỎ HÀNG CỦA BẠN
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-20 text-center rounded-sm shadow-sm">
            <div className="text-8xl mb-6 opacity-20">🛒</div>
            <p className="text-gray-500 mb-8">Giỏ hàng của bạn đang trống.</p>
            <Link href="/" className="bg-[#ee4d2d] text-white px-10 py-4 rounded-sm font-bold hover:bg-[#d73211] transition-all">
              MUA SẮM NGAY
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase">Sản phẩm</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">Số lượng</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase text-center">Đơn giá</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cart.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-sm flex items-center justify-center text-2xl flex-shrink-0">
                            {item.images?.[0] ? <img src={item.images[0]} className="w-full h-full object-cover" /> : "🌱"}
                          </div>
                          <div>
                            <Link href={`/san-pham/${item.slug}`} className="font-bold text-gray-900 hover:text-[#ee4d2d] line-clamp-1">
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center font-bold">{item.quantity}</td>
                      <td className="p-4 text-center">
                        <span className="text-[#ee4d2d] font-bold">₫{item.price?.toLocaleString("vi-VN")}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => removeFromCart(i)}
                          className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Summary */}
            <div className="bg-white p-6 rounded-sm shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-gray-500 text-sm">Tổng thanh toán ({cart.length} sản phẩm):</p>
                <p className="text-3xl font-black text-[#ee4d2d]">₫{cartTotal.toLocaleString("vi-VN")}</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Link href="/" className="flex-1 md:flex-none text-center border border-gray-200 px-8 py-4 rounded-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                  TIẾP TỤC MUA
                </Link>
                <button 
                  onClick={openCheckout}
                  className="flex-1 md:flex-none bg-[#ee4d2d] text-white px-12 py-4 rounded-sm font-black text-lg shadow-lg hover:bg-[#d73211] transition-all"
                >
                  ĐẶT HÀNG NGAY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        isFullCart={true}
      />
    </div>
  );
}
