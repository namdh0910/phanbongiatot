const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog) res.json(blog);
    else res.status(404).json({ message: 'Blog not found' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const created = await blog.save();
    res.status(201).json(created);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (blog) res.json(blog);
    else res.status(404).json({ message: 'Blog not found' });
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const deleteBlogsBulk = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Invalid IDs provided' });
    }
    await Blog.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Blogs removed successfully' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, deleteBlog, updateBlog, deleteBlogsBulk };
