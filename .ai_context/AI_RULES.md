# QUY TẮC PHÁT TRIỂN & CRO (PHANBONGIATOT.COM)

## 1. Mục tiêu Chuyển đổi (Conversion)
- **Primary CTA**: Mọi nút CTA (Call to Action) phải hướng người dùng về **Zalo** hoặc **Hotline** để nhận giải pháp phục hồi từ kỹ sư.
- **No E-commerce**: Hạn chế tối đa các luồng giỏ hàng/thanh toán truyền thống. Tập trung vào việc để lại thông tin tư vấn (Lead Generation).
- **Sticky UX**: Giao diện Mobile phải luôn có một **Bottom Bar** chứa nút Zalo dính chặt (Sticky) để nông dân dễ dàng bấm gọi bất cứ lúc nào.

## 2. Ngôn ngữ & Nội dung (Tone of Voice)
- **Tư duy phục hồi**: Tuyệt đối không dùng các từ mang tính tiêu cực hoặc độc hại như: *thuốc độc, diệt sạch, hóa chất*. Tuyệt đối không dùng từ mang tính y tế nặng nề như **"phác đồ"**, thay bằng **"giải pháp"** hoặc **"quy trình"**.
- **Từ vựng ưu tiên**: Luôn dùng các từ: *phục hồi, sinh học, vi sinh, hữu cơ, bền vững, an toàn*.
- **Đối tượng**: Ngôn ngữ phải bình dân, dễ hiểu, trực quan cho nông dân nhưng vẫn giữ được sự chuyên nghiệp của một kỹ sư nông nghiệp.

## 3. Thiết kế & Trải nghiệm (UI/UX)
- **Mobile-First**: Ưu tiên trải nghiệm trên điện thoại (vì 90% nông dân dùng smartphone để tra cứu tại vườn).
- **Màu sắc chủ đạo**: 
  - **Xanh lá (Leaf Green)**: Đại diện cho sự phục hồi và sức sống.
  - **Nâu (Earth Brown)**: Đại diện cho đất và phân bón hữu cơ.
- **Trực quan**: Sử dụng hình ảnh thực tế về bệnh lý cây trồng (vàng lá, thối rễ...) để nông dân dễ đối chiếu.

## 4. Cấu trúc Kỹ thuật (Technical)
- **Next.js App Router**: Sử dụng thư mục `src/app`.
- **Dynamic Routing**: Mọi giải pháp điều trị hoặc chi tiết sản phẩm phải dùng slug tiếng Việt không dấu (VD: `/giai-phap/phuc-hoi-sau-rieng-vang-la`).
- **Data-Driven**: Ưu tiên lưu trữ giải pháp trong `src/data` dưới dạng JSON để dễ dàng quản lý và cập nhật.
