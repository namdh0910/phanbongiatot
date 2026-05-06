import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pathology from '@/lib/models/Pathology';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const solutions = [
      {
        title: "Xử lý tuyến trùng rễ trên cây hồ tiêu",
        slug: "xu-ly-tuyen-trung-ho-tieu",
        icon: "🌶️",
        painPoint: "Hồ tiêu vàng lá hàng loạt, rễ xuất hiện các nốt sần, cây đứng chựng không phát triển dù bón nhiều phân.",
        cause: "Tuyến trùng tấn công làm hỏng mạch dẫn, tạo vết thương cho nấm Phytophthora xâm nhập gây chết nhanh chết chậm.",
        biologicalSolution: "Ứng dụng chế phẩm sinh học NEMANO để tiêu diệt tuyến trùng bằng cơ chế nấm ký sinh, bảo vệ bộ rễ bền vững.",
        videoId: "bQif4TJJugg",
        symptoms: [
          "Lá vàng xanh xao, mép lá hơi xoăn lại",
          "Rễ tơ xuất hiện các nốt sần, u bướu to nhỏ",
          "Cây không đâm chồi mới mặc dù đang mùa mưa",
          "Bón phân hóa học vào cây không hấp thụ, đất bị chai cứng"
        ],
        wrongActions: [
          "Đổ thuốc trừ sâu hóa học liều cao xuống gốc làm chết vi sinh có lợi",
          "Bón quá nhiều phân đạm khi cây đang bệnh làm thối rễ nặng hơn",
          "Xới xáo gốc quá mạnh làm đứt rễ, tạo điều kiện cho nấm xâm nhập"
        ],
        stats: {
          successVouchers: "850+",
          recoveryTime: "21 - 30 ngày"
        },
        steps: [
          {
            name: "Tiêu diệt Tuyến trùng & Nấm bệnh",
            time: "Ngày 1",
            description: "Pha 500ml NEMANO với 400 lít nước, tưới đẫm vùng gốc (10-15 lít/gốc). Cơ chế nấm ký sinh sẽ tiêu diệt trứng và tuyến trùng trưởng thành.",
            product: null
          },
          {
            name: "Kích rễ tơ & Cải tạo đất",
            time: "Ngày 7",
            description: "Dùng Humic Mỹ kết hợp Fulvic để kích thích rễ tơ mới ra trắng xóa, giúp cây bắt đầu hấp thụ lại dinh dưỡng.",
            product: null
          },
          {
            name: "Bảo vệ & Phục hồi xanh lá",
            time: "Ngày 15",
            description: "Bổ sung Trichoderma và Bacillus để đối kháng nấm bệnh lâu dài, giúp lá xanh dày trở lại.",
            product: null
          }
        ],
        testimonials: [
          {
            name: "Chú Năm Hữu",
            location: "Chư Sê, Gia Lai",
            quote: "Vườn tiêu 5 năm tuổi tưởng phải múc bỏ vì tuyến trùng, may mà gặp quy trình này rễ ra lại trắng xóa, lá xanh mướt rồi."
          },
          {
            name: "Anh Hoàng",
            location: "Đắk Đoa, Đắk Lắk",
            quote: "Quy trình sinh học nên đất tơi xốp hẳn ra, cây bền hơn hẳn so với đổ thuốc hóa học như trước."
          }
        ]
      },
      {
        title: "Xử lý Vàng lá thối rễ trên cây Sầu Riêng",
        slug: "vang-la-thoi-re-sau-rieng",
        icon: "🌳",
        painPoint: "Cây sầu riêng vàng lá cả cây hoặc theo từng cành, rễ tơ bị thối đen, vỏ rễ dễ tuột.",
        cause: "Nấm Phytophthora & Fusarium tấn công rễ trong mùa mưa hoặc khi đất thoát nước kém.",
        biologicalSolution: "Kết hợp bộ đôi sát khuẩn mạnh và kích rễ cực nhanh để phục hồi mạch dẫn.",
        videoId: "WQGLo4yJjI0",
        symptoms: [
          "Lá vàng đều từ gân lá ra ngoài",
          "Cành bị khô, rụng lá hàng loạt",
          "Rễ tơ thối nhũn, có mùi hôi",
          "Thân cây có dấu hiệu xì mủ nếu bệnh nặng"
        ],
        wrongActions: [
          "Sử dụng phân đạm cao làm vết thối lan nhanh",
          "Dùng thuốc diệt cỏ làm hỏng hệ vi sinh vật đất",
          "Tưới quá nhiều nước làm đất thiếu oxy cho rễ"
        ],
        stats: {
          successVouchers: "1200+",
          recoveryTime: "14 - 21 ngày"
        },
        steps: [
          {
             name: "Sát khuẩn tầng rễ",
             time: "Ngày 1",
             description: "Tưới bộ đôi sát khuẩn để khoanh vùng vết thối, không cho nấm lan rộng.",
             product: null
          }
        ],
        testimonials: []
      }
    ];

    await Pathology.deleteMany({});
    await Pathology.insertMany(solutions);

    return NextResponse.json({ message: 'Seeded successfully', count: solutions.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
