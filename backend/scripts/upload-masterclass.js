const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });
const connectDB = require('../config/db');
const Blog = require('../models/Blog');

// Connect DB
connectDB();

// Hàm tạo Slug từ Tiêu đề
function generateSlug(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Chạy script
const run = async () => {
  const contentDir = path.join(__dirname, '../content');
  
  if (!fs.existsSync(contentDir)) {
    console.log('Tạo thư mục content...');
    fs.mkdirSync(contentDir);
    console.log('Thư mục rỗng. Hãy thêm file .html vào thư mục backend/content/');
    process.exit(0);
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.html'));

  if (files.length === 0) {
    console.log('Không tìm thấy file .html nào trong backend/content/');
    process.exit(0);
  }

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const contentHTML = fs.readFileSync(filePath, 'utf-8');

    console.log(`\n⏳ Đang xử lý file: ${file}`);

    // Parse Metadata block từ HTML (dạng <!-- META: {...} -->)
    let meta = {
      title: 'Chưa có tiêu đề',
      excerpt: 'Chưa có mô tả',
      tags: ['Kỹ Thuật'],
      image: 'https://loremflickr.com/800/600/agriculture,farm/all'
    };

    const metaMatch = contentHTML.match(/<!--\s*META:\s*({[\s\S]*?})\s*-->/);
    if (metaMatch) {
      try {
        meta = { ...meta, ...JSON.parse(metaMatch[1]) };
        console.log(`   Đã parse metadata thành công: ${meta.title}`);
      } catch (e) {
        console.error(`   ❌ Lỗi parse metadata trong file ${file}:`, e.message);
      }
    } else {
      console.log(`   ⚠️ Không tìm thấy block <!-- META: {...} -->. Dùng mặc định.`);
    }

    const slug = generateSlug(meta.title);

    // Tính số từ
    const wordCount = contentHTML.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    console.log(`   📝 Độ dài: ~${wordCount} từ`);

    if (wordCount < 1000) {
      console.log(`   ⚠️ Cảnh báo: Bài viết hơi ngắn (${wordCount} từ). Masterclass nên > 3000 từ.`);
    }

    try {
      // Upsert (Tìm slug, có thì update, chưa có thì tạo mới)
      const existing = await Blog.findOne({ slug });
      if (existing) {
        existing.title = meta.title;
        existing.content = contentHTML; // Xóa block META nếu muốn, nhưng để cũng ko sao (HTML comment ko hiện)
        existing.excerpt = meta.excerpt;
        existing.tags = meta.tags;
        existing.image = meta.image;
        await existing.save();
        console.log(`   ✅ Đã CẬP NHẬT bài viết: ${slug}`);
      } else {
        const newBlog = new Blog({
          title: meta.title,
          slug: slug,
          content: contentHTML,
          excerpt: meta.excerpt,
          tags: meta.tags,
          image: meta.image
        });
        await newBlog.save();
        console.log(`   ✅ Đã TẠO MỚI bài viết: ${slug}`);
      }
      
      // Xóa hoặc move file sau khi up thành công (tùy chọn)
      // fs.renameSync(filePath, path.join(contentDir, 'done_' + file));
      
    } catch (err) {
      console.error(`   ❌ Lỗi lưu database cho ${file}:`, err.message);
    }
  }

  console.log('\n🎉 Đã chạy xong toàn bộ batch.');
  process.exit(0);
};

run();
