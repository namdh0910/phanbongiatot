
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://ktlds:ktlds123@cluster0.mongodb.net/phanbongiatot";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function fixTable() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const slug = "xu-ly-vang-la-cay-ca-phe-nguyen-nhan-cach-chua-va-phong-ngua-hieu-qua";
    const blog = await Blog.findOne({ slug });

    if (blog) {
      // Fix the broken table header
      let newContent = blog.content.replace(
        /<thead>\s*<tr[^>]*>\s*<th[^>]*>Câu hỏi quan sát Đặc điểm Nguyên nhân nghi ngờ<\/th>\s*<\/tr>\s*<\/thead>/g,
        `<thead>
          <tr style="background-color: #f8fafc;">
            <th style="padding: 15px 20px; text-align: left; font-weight: 800; color: #1a5c2a;">Câu hỏi quan sát</th>
            <th style="padding: 15px 20px; text-align: left; font-weight: 800; color: #1a5c2a;">Đặc điểm</th>
            <th style="padding: 15px 20px; text-align: left; font-weight: 800; color: #1a5c2a;">Nguyên nhân nghi ngờ</th>
          </tr>
        </thead>`
      );

      // If it's not a thead issue, it might be just a normal row used as header
      if (newContent === blog.content) {
         newContent = blog.content.replace(
            /<tr>\s*<td><strong>Câu hỏi quan sát Đặc điểm Nguyên nhân nghi ngờ<\/strong><\/td>\s*<\/tr>/g,
            `<tr>
              <td style="padding: 15px 20px; font-weight: 800; color: #1a5c2a; background: #f8fafc;">Câu hỏi quan sát</td>
              <td style="padding: 15px 20px; font-weight: 800; color: #1a5c2a; background: #f8fafc;">Đặc điểm</td>
              <td style="padding: 15px 20px; font-weight: 800; color: #1a5c2a; background: #f8fafc;">Nguyên nhân nghi ngờ</td>
            </tr>`
         );
      }

      blog.content = newContent;
      await blog.save();
      console.log("Blog table fixed successfully!");
    } else {
      console.log("Blog not found");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error fixing table:", error);
    process.exit(1);
  }
}

fixTable();
