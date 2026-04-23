const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

// POST /api/upload - upload 1 hoặc nhiều ảnh
router.post('/', protect, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const urls = req.files.map(file => file.path);
    res.json({ urls, message: `Uploaded ${urls.length} image(s)` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
