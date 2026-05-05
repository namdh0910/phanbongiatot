import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thư viện kiến thức nông nghiệp | Phân Bón Giá Tốt",
  description: "Cẩm nang kỹ thuật trồng trọt sầu riêng, cà phê, hồ tiêu. Xem các video và nhật ký phục hồi thực tế từ kỹ sư Phân Bón Giá Tốt.",
  alternates: {
    canonical: 'https://www.phanbongiatot.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
