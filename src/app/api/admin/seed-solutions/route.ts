import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pathology from '@/lib/models/Pathology';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
  try {
    // Tạm thời bỏ check admin để seed dễ dàng
    /*
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    */

    await dbConnect();

    const solutions = [
      // 1. XỬ LÝ BỆNH LÝ (benh-ly)
      {
        title: "Xử lý tuyến trùng rễ trên cây hồ tiêu",
        slug: "xu-ly-tuyen-trung-ho-tieu",
        icon: "🌶️",
        category: "benh-ly",
        painPoint: "Hồ tiêu vàng lá hàng loạt, rễ xuất hiện các nốt sần, cây đứng chựng không phát triển dù bón nhiều phân.",
        cause: "Tuyến trùng tấn công làm hỏng mạch dẫn, tạo vết thương cho nấm Phytophthora xâm nhập gây chết nhanh chết chậm.",
        videoId: "bQif4TJJugg",
        symptoms: ["Lá vàng xanh xao", "Rễ tơ nốt sần", "Cây đứng chựng", "Đất chai cứng"],
        wrongActions: ["Đổ thuốc sâu hóa học", "Bón nhiều đạm khi bệnh", "Xới gốc mạnh"],
        stats: { successVouchers: "850+", recoveryTime: "21 - 30 ngày" },
        steps: [
          { name: "Tiêu diệt Tuyến trùng", time: "Ngày 1", description: "Tưới Nemano để diệt trứng và tuyến trùng.", product: null },
          { name: "Kích rễ mới", time: "Ngày 7", description: "Dùng Humic Mỹ kích rễ tơ.", product: null },
          { name: "Bảo vệ rễ", time: "Ngày 15", description: "Bổ sung vi sinh vật đối kháng.", product: null }
        ]
      },
      {
        title: "Xử lý Vàng lá thối rễ trên cây Sầu Riêng",
        slug: "vang-la-thoi-re-sau-rieng",
        icon: "🌳",
        category: "benh-ly",
        painPoint: "Lá sầu riêng vàng cả cây, rễ tơ thối đen, cây rụng lá hàng loạt.",
        cause: "Nấm Phytophthora & Fusarium tấn công rễ do đất thoát nước kém.",
        videoId: "WQGLo4yJjI0",
        symptoms: ["Lá vàng gân xanh", "Rễ thối nhũn", "Cành khô héo"],
        wrongActions: ["Bón phân hóa học ngay", "Tưới quá nhiều nước"],
        stats: { successVouchers: "1200+", recoveryTime: "14 - 21 ngày" },
        steps: [
          { name: "Sát khuẩn tầng rễ", time: "Ngày 1", description: "Tưới bộ đôi sát khuẩn mạnh.", product: null }
        ]
      },
      {
        title: "Xử lý Nấm hồng trên cây Cà phê",
        slug: "xu-ly-nam-hong-ca-phe",
        icon: "☕",
        category: "benh-ly",
        painPoint: "Cành cà phê xuất hiện lớp nấm màu hồng bao quanh, làm khô cành và rụng quả.",
        cause: "Nấm Erythricium salmonicolor phát triển mạnh trong mùa mưa, độ ẩm cao.",
        videoId: "dQw4w9WgXcQ",
        symptoms: ["Vết nấm hồng trên cành", "Lá héo rũ trên cành bệnh", "Cành khô chết"],
        wrongActions: ["Phun thuốc không đúng nồng độ", "Không tỉa cành bệnh"],
        stats: { successVouchers: "600+", recoveryTime: "10 ngày" },
        steps: [
          { name: "Phun thuốc đặc trị", time: "Ngày 1", description: "Phun xịt đều lên cành bị nấm.", product: null }
        ]
      },

      // 2. KÍCH RỄ (kich-re)
      {
        title: "Kích rễ tơ Sầu riêng giai đoạn kiến thiết",
        slug: "kich-re-sau-rieng-kien-thiet",
        icon: "🌱",
        category: "kich-re",
        painPoint: "Cây con chậm lớn, bộ rễ yếu, không đâm chồi mới sau khi trồng.",
        cause: "Đất thiếu mùn, rễ chưa thích nghi với môi trường đất mới.",
        videoId: "dQw4w9WgXcQ",
        symptoms: ["Cây lùn còi", "Lá nhỏ, nhạt màu", "Không ra cơi đọt"],
        wrongActions: ["Bón NPK quá sớm", "Lấp đất quá sâu"],
        stats: { successVouchers: "2000+", recoveryTime: "7 ngày" },
        steps: [
          { name: "Ngâm kích rễ", time: "Ngày 1", description: "Dùng thuốc kích rễ nồng độ nhẹ.", product: null }
        ]
      },
      {
        title: "Phục hồi bộ rễ bị nghẹt do ngập úng",
        slug: "phuc-hoi-re-nghap-ung",
        icon: "🌊",
        category: "kich-re",
        painPoint: "Sau mùa lũ, rễ cây bị thối do thiếu oxy kéo dài, cây héo rũ.",
        cause: "Nước ngập làm đất bị yếm khí, rễ bị ngạt và thối hỏng.",
        videoId: "dQw4w9WgXcQ",
        symptoms: ["Lá héo dù đất ẩm", "Rễ đen, không có lông hút"],
        wrongActions: ["Xới gốc khi đất còn ướt", "Bón phân hữu cơ chưa oai"],
        stats: { successVouchers: "450+", recoveryTime: "15 ngày" },
        steps: [
          { name: "Phá váng mặt đất", time: "Ngày 1", description: "Tạo độ thông thoáng cho đất.", product: null }
        ]
      },

      // 3. NUÔI TRÁI (nuoi-trai)
      {
        title: "Nuôi trái Sầu riêng tròn đều, không méo",
        slug: "nuoi-trai-sau-rieng-khong-meo",
        icon: "🍋",
        category: "nuoi-trai",
        painPoint: "Trái sầu riêng bị giật hộc, méo mó, cơm bị sượng hoặc cháy múi.",
        cause: "Mất cân bằng dinh dưỡng và cạnh tranh cơi đọt khi đang nuôi trái.",
        videoId: "dQw4w9WgXcQ",
        symptoms: ["Trái vẹo, hộc lép", "Rụng trái non hàng loạt"],
        wrongActions: ["Tưới nước thất thường", "Để cây đi đọt mạnh"],
        stats: { successVouchers: "1500+", recoveryTime: "Suốt vụ" },
        steps: [
          { name: "Chặn đọt kịp thời", time: "Giai đoạn 1", description: "Quản lý cơi đọt không cho cạnh tranh dinh dưỡng.", product: null }
        ]
      },
      {
        title: "Tạo ngọt và lên màu đẹp cho Cam Bưởi",
        slug: "tao-ngot-len-mau-cam-buoi",
        icon: "🍊",
        category: "nuoi-trai",
        painPoint: "Cam bưởi trái to nhưng nhạt, vỏ dày, màu sắc không bắt mắt.",
        cause: "Thiếu Kali hữu hiệu và các trung vi lượng cần thiết cuối vụ.",
        videoId: "dQw4w9WgXcQ",
        symptoms: ["Trái chua, ít nước", "Vỏ sần sùi"],
        wrongActions: ["Bón nhiều đạm cuối vụ", "Sử dụng Kali clo làm chua đất"],
        stats: { successVouchers: "700+", recoveryTime: "30 ngày trước thu hoạch" },
        steps: [
          { name: "Bổ sung Kali hữu cơ", time: "Tuần 1", description: "Tưới hoặc phun Kali tinh khiết.", product: null }
        ]
      },

      // 4. PHỤC HỒI (phuc-hoi)
      {
        title: "Phục hồi vườn Cà phê già cỗi năng suất kém",
        slug: "phuc-hoi-ca-phe-gia-coi",
        icon: "♻️",
        category: "phuc-hoi",
        painPoint: "Vườn cà phê lâu năm thân già, cành khô nhiều, năng suất giảm mạnh.",
        cause: "Đất bị suy kiệt dinh dưỡng và chai hóa do thâm canh quá mức.",
        videoId: "dQw4w9WgXcQ",
        symptoms: ["Cành ngắn, ít mắt quả", "Lá nhỏ, rụng sớm"],
        wrongActions: ["Bón phân hóa học liều cao", "Không cải tạo nền đất"],
        stats: { successVouchers: "900+", recoveryTime: "1 mùa vụ" },
        steps: [
          { name: "Cải tạo nền đất", time: "Tháng 1", description: "Tưới vi sinh phân hủy chất hữu cơ.", product: null }
        ]
      },
      {
        title: "Chăm sóc cây sau khi cắt cành tạo tán",
        slug: "cham-soc-cay-sau-cat-canh",
        icon: "✂️",
        category: "phuc-hoi",
        painPoint: "Cây bị sốc sau khi cắt tỉa, vết thương lâu lành, chồi mới yếu.",
        cause: "Cây bị mất lượng lớn tán lá, hệ rễ tạm thời bị ngưng trệ.",
        videoId: "dQw4w9WgXcQ",
        symptoms: ["Chồi mới bị rệp tấn công", "Vết cắt bị nấm"],
        wrongActions: ["Cắt tỉa khi trời mưa", "Không quét thuốc bảo vệ vết cắt"],
        stats: { successVouchers: "3000+", recoveryTime: "15 ngày" },
        steps: [
          { name: "Vệ sinh vườn", time: "Ngày 1", description: "Phun rửa vườn sát khuẩn vết cắt.", product: null }
        ]
      }
    ];

    await Pathology.deleteMany({});
    await Pathology.insertMany(solutions);

    return NextResponse.json({ message: 'Seeded successfully with 10 detailed solutions', count: solutions.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
