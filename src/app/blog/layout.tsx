import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiến Thức Nhà Nông Tây Nguyên | Phan Bón Giá Tốt",
  description: "Tổng hợp kinh nghiệm chăm sóc sầu riêng, cà phê từ đội ngũ chuyên gia Phan Bón Giá Tốt. Bí quyết trị vàng lá, tuyến trùng hiệu quả. Xem ngay kiến thức miễn phí!",
  alternates: {
    canonical: 'https://www.phanbongiatot.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
