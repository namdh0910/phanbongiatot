const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogsBulk
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getBlogs);
router.post('/', protect, admin, createBlog);
router.put('/:id', protect, admin, updateBlog);
router.delete('/:id', protect, admin, deleteBlog);
router.route('/bulk-delete').post(protect, deleteBlogsBulk);
router.route('/slug/:slug').get(getBlogBySlug);

module.exports = router;
