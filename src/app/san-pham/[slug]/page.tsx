import { API_BASE_URL } from '@/utils/api';
import LeadForm from '@/components/shared/LeadForm';

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

async function getPathologies() {
  try {
    const res = await fetch(`${API_BASE_URL}/pathologies`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.pathologies || [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Chế Phẩm Sinh Học | Phân Bón Giá Tốt" };
  
  return {
    title: `${product.name} - Bản Hướng Dẫn Kỹ Thuật | Phân Bón Giá Tốt`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Giải Pháp Phục Hồi Cây`,
      description: product.description,
      type: 'article'
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Get related pathology objects from API
  const allPathologies = await getPathologies();
  const relatedPathologyData = allPathologies.filter((path: any) => 
    product.relatedPathologies?.includes(path.slug)
  );

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Section 1: Hero Product Overview */}
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image Placeholder */}
            <div className="aspect-square bg-white rounded-[3rem] shadow-xl border border-gray-100 flex items-center justify-center text-9xl">
              {product.icon}
            </div>

            {/* Product Title & Short Intro */}
            <div>
              <span className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                 Bản Hướng Dẫn Kỹ Thuật
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs bg-white text-emerald-700 border border-emerald-100 px-3 py-1 rounded-lg font-bold">
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">
                {product.description}
              </p>

              <div className="space-y-4">
                 <a href={`https://zalo.me/0773440966?text=Tôi muốn nhận phác đồ cho sản phẩm ${product.name}`} className="w-full bg-[#0068FF] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-blue-200 transition-all active:scale-95">
                    <MessageCircle fill="currentColor" /> Gửi tình trạng vườn nhận liều lượng chuẩn
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tight text-center mb-16">
              Cơ Chế Hoạt Động <span className="text-emerald-600">Tại Gốc & Đất</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
               {product.mechanism.map((item, idx) => (
                 <div key={idx} className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-[2.5rem] relative group hover:bg-emerald-50 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 mb-6 font-black text-xl">
                       {idx + 1}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Applications (Internal Linking) */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tight text-center mb-16">
              Khắc Tinh Của Các <span className="text-red-600">Bệnh Lý:</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
               {relatedPathologyData.map(path => (
                 <Link key={path.slug} href={`/giai-phap/${path.slug}`} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex items-center gap-4 group">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                       ⚠️
                    </div>
                    <div>
                       <h4 className="font-black text-gray-900 text-lg group-hover:text-emerald-700 transition-colors">{path.title}</h4>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                          Xem phác đồ cứu cây <ArrowRight size={12} />
                       </span>
                    </div>
                 </Link>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Mixing Notes & CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
             <div className="bg-orange-50 border-2 border-orange-200 rounded-[3rem] p-8 md:p-12 mb-16 relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white w-12 h-12 rounded-full border-2 border-orange-200 flex items-center justify-center">
                   <AlertTriangle className="text-orange-600" />
                </div>
                <h3 className="text-xl font-black text-orange-900 uppercase italic text-center mb-4">Lưu ý phối trộn quan trọng:</h3>
                <p className="text-orange-800 font-bold text-center italic leading-relaxed">
                  "{product.warning}"
                </p>
                <div className="mt-6 pt-6 border-t border-orange-200 text-center text-xs font-black text-orange-600 uppercase tracking-widest">
                   Hỏi kỹ thuật viên trước khi pha chung với bất kỳ sản phẩm nào khác
                </div>
             </div>

             <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tight mb-4">
                  Nhận Công Thức Phối Trộn An Toàn
                </h2>
                <p className="text-gray-500 font-medium">Kỹ sư sẽ gọi lại ngay để hướng dẫn bà con cách dùng {product.name} chuẩn nhất cho vườn nhà mình.</p>
             </div>

             <LeadForm initialPathology={product.useCase} initialCrop="Sầu riêng" />
          </div>
        </div>
      </section>
    </div>
  );
}
