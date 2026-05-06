import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pathology from '@/lib/models/Pathology';

export async function GET() {
  try {
    await dbConnect();
    
    const solutions = [
      {
        title: "Phục hồi cây sầu riêng sau thu hoạch",
        slug: "phuc-hoi-sau-thu-hoach",
        icon: "🌳",
        painPoint: "Cây sầu riêng bị suy kiệt, khô cành, rụng lá sau thời gian dài nuôi trái nặng nề. Bà con lo lắng cây không đủ sức cho vụ tới.",
        cause: "Đất bị nén chặt, thiếu dinh dưỡng hữu cơ, hệ rễ bị tổn thương sau quá trình khai thác quá mức.",
        biologicalSolution: "Sử dụng bộ đôi Phục Hồi kết hợp Humic cao cấp để kích thích rễ mới, giải độc đất và tái tạo tán lá xanh dày.",
        videoId: "6Wn8zZ478_Y"
      },
      {
        title: "Xử lý tuyến trùng rễ trên cây hồ tiêu",
        slug: "xu-ly-tuyen-trung-ho-tieu",
        icon: "🦠",
        painPoint: "Hồ tiêu vàng lá hàng loạt, rễ xuất hiện các nốt sần, cây đứng chững không phát triển dù bón nhiều phân.",
        cause: "Tuyến trùng tấn công làm hỏng mạch dẫn, tạo vết thương cho nấm Phytophthora xâm nhập gây chết nhanh chết chậm.",
        biologicalSolution: "Ứng dụng chế phẩm NEMANO để tiêu diệt tuyến trùng bằng cơ chế nấm ký sinh, bảo vệ bộ rễ bền vững.",
        videoId: "dQw4w9WgXcQ"
      },
      {
        title: "Phòng ngừa rụng bông, rụng trái non cà phê",
        slug: "chong-rung-trai-non-ca-phe",
        icon: "🍋",
        painPoint: "Cà phê rụng trái hàng loạt khi gặp mưa đầu mùa hoặc gió lớn, gây thất thu năng suất nghiêm trọng.",
        cause: "Rối loạn sinh lý, thiếu hụt vi lượng Bo và Canxi, kèm theo áp lực nấm bệnh tấn công cuống trái.",
        biologicalSolution: "Phun bộ đôi Chống Rụng kết hợp Canxi Bo giúp dai cuống, tăng sức chống chịu và bảo vệ trái non.",
        videoId: "6Wn8zZ478_Y"
      },
      {
        title: "Kích rễ, xanh lá vườn suy kiệt bằng Humic",
        slug: "kich-re-phuc-hoi-vuon-suy",
        icon: "🌱",
        painPoint: "Vườn cây bị cằn cỗi, lá vàng nhỏ, bón phân hóa học nhiều nhưng không hiệu quả, tốn kém chi phí.",
        cause: "Đất bị thoái hóa, mất hệ vi sinh vật có lợi, độ pH thấp làm cây không hấp thụ được dinh dưỡng.",
        biologicalSolution: "Tưới Humic đậm đặc kết hợp nấm Trichoderma để cải thiện cấu trúc đất, kích rễ cực mạnh.",
        videoId: "dQw4w9WgXcQ"
      }
    ];

    // Clear existing to avoid duplicates if needed, or just insert
    // For this task, we insert if not exist or just delete and re-insert
    await Pathology.deleteMany({});
    const created = await Pathology.insertMany(solutions);

    return NextResponse.json({ message: "Seeded 4 solutions successfully", created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
