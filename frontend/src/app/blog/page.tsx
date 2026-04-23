import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import Link from "next/link";

async function getBlogs() {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    return [
      { title: "Cách nhận biết sầu riêng bị vàng lá thối rễ", excerpt: "Vàng lá thối rễ là căn bệnh nguy hiểm số 1 trên cây sầu riêng. Bài viết hướng dẫn chi tiết cách nhận biết từ sớm...", date: "20/04/2026", img: "🌳", slug: "cach-nhan-biet-sau-rieng-vang-la-thoi-re" },
      { title: "Tuyến trùng rễ cà phê: Kẻ giết người thầm lặng", excerpt: "Nhiều nhà nông nhầm lẫn tuyến trùng rễ với thiếu phân. Dưới đây là 3 dấu hiệu đặc trưng nhất để nhận diện tuyến trùng trên cây cà phê.", date: "18/04/2026", img: "☕", slug: "tuyen-trung-re-ca-phe" },
      { title: "Kỹ thuật bón phân giai đoạn ra hoa đậu trái", excerpt: "Bón phân không đúng cách lúc ra hoa sẽ làm rụng bông, rụng trái non hàng loạt. Bí quyết là sử dụng Canxi Bo và hạn chế đạm...", date: "15/04/2026", img: "🌸", slug: "ky-thuat-bon-phan-ra-hoa" },
    ];
  }
}

export default async function BlogIndex() {
  const posts = await getBlogs();

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-4">Kiến Thức Nông Nghiệp</h1>
          <p className="text-lg text-gray-600">Chia sẻ kỹ thuật canh tác, cách phòng trừ sâu bệnh từ các kỹ sư giàu kinh nghiệm.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, i: number) => (
            <Link href={`/blog/${post.slug}`} key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group flex flex-col h-full border border-gray-100">
              <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl group-hover:bg-primary/10 transition-colors">
                {post.image || post.img || "📚"}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-sm text-primary font-bold mb-3">{post.date || new Date(post.createdAt || Date.now()).toLocaleDateString('vi-VN')}</span>
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-gray-600 mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                <span className="text-primary font-bold flex items-center gap-2 mt-auto">
                  Đọc tiếp <span className="text-xl">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
