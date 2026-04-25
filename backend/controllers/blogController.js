const Blog = require('../models/Blog');

// @desc    Get all blog posts
// @route   GET /api/blog
const getBlogs = async (req, res) => {
  try {
    const { crop, category, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (crop && crop !== 'Tất cả') {
      query.crops = { $in: [crop] };
    }
    
    if (category) {
      query.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
      
    const total = await Blog.countDocuments(query);

    res.json({
      blogs,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog) {
      blog.viewCount += 1;
      await blog.save();
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create blog post (Admin)
// @route   POST /api/blog
const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update blog post (Admin)
// @route   PUT /api/blog/:id
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (blog) res.json(blog);
    else res.status(404).json({ message: 'Không tìm thấy bài viết' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete blog post (Admin)
// @route   DELETE /api/blog/:id
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) res.json({ message: 'Đã xóa bài viết' });
    else res.status(404).json({ message: 'Không tìm thấy bài viết' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
};
