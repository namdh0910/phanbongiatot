const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/Product');
const Blog = require('./models/Blog');

dotenv.config({ path: path.join(__dirname, './.env') });

const checkData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const products = await Product.find({});
    console.log(`Total products: ${products.length}`);
    
    const blogs = await Blog.find({});
    console.log(`Total blogs: ${blogs.length}`);
    blogs.forEach(b => console.log(`- ${b.title} | Slug: ${b.slug}`));

    if (blogs.length === 0) {
        console.log('Seeding initial blogs...');
        await Blog.create([
            {
                title: "Bí Quyết Phục Hồi Sầu Riêng Sau Thu Hoạch",
                slug: "bi-quyet-phuc-hoi-sau-rieng-sau-thu-hoach",
                excerpt: "Sau một mùa vụ nuôi trái mệt mỏi, cây sầu riêng cần được chăm sóc đặc biệt để phục hồi bộ rễ và cành lá...",
                content: "<p>Nội dung chi tiết bài viết phục hồi sầu riêng...</p>",
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800",
                category: "Kỹ thuật canh tác",
                crops: ["Sầu riêng"]
            },
            {
                title: "Sự Thật Về Rệp Sáp: Kẻ Sát Nhân Thầm Lặng",
                slug: "su-that-ve-rep-sap",
                excerpt: "Rệp sáp không chỉ hút nhựa mà còn là vật trung gian truyền bệnh virus nguy hiểm. Đây là phác đồ tiêu diệt tận gốc...",
                content: "<p>Nội dung chi tiết bài viết rệp sáp...</p>",
                image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?q=80&w=800",
                category: "Phòng trừ sâu bệnh",
                crops: ["Cà phê", "Tiêu", "Sầu riêng"]
            }
        ]);
        console.log('Blogs Seeded!');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

checkData();
