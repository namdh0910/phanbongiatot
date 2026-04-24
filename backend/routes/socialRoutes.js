const express = require('express');
const router = express.Router();
const { publishBlogToFacebook } = require('../controllers/socialController');
const { protect } = require('../middleware/authMiddleware');

router.route('/publish-facebook/:id').post(protect, publishBlogToFacebook);

module.exports = router;
