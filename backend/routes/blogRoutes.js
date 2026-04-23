const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog, deleteBlog, updateBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/slug/:slug').get(getBlogBySlug);
router.route('/:id').put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;
