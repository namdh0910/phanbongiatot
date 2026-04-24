const Blog = require('../models/Blog');
const { publishToFacebookPage } = require('../services/facebookService');

// @desc    Publish a blog post to Facebook
// @route   POST /api/social/publish-facebook/:id
// @access  Private/Admin
const publishBlogToFacebook = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }

    // Tạo nội dung bài đăng chuẩn Agent 6
    const tags = blog.tags && blog.tags.length > 0 
      ? blog.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ') 
      : '#PhânBónGiáTốt #NôngNghiệp';

    const message = `🌱 ${blog.title}\n\n${blog.excerpt || 'Kiến thức nông nghiệp hữu ích cho nhà vườn.'}\n\n👉 Đọc hướng dẫn chi tiết tại đây:\nhttps://phanbongiatot.com/blog/${blog.slug}\n\n${tags}`;

    const postData = {
      message: message,
      link: `https://phanbongiatot.com/blog/${blog.slug}`,
    };

    const fbResult = await publishToFacebookPage(postData);

    res.json({ 
      message: 'Đăng lên Fanpage thành công!', 
      postId: fbResult.id 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  publishBlogToFacebook
};
