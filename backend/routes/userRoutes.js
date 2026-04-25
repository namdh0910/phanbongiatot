const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @desc    Get user profile by ID (Public)
// @route   GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user && (user.role === 'vendor' || user.role === 'admin')) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Không tìm thấy gian hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
