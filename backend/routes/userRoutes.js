const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @desc    Update user status (Admin only)
// @route   PATCH /api/users/:id/status
router.get('/', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (status) user.status = status;
    if (role) user.role = role;
    
    if (status === 'active' && user.role === 'vendor') {
      user.vendorInfo.isApproved = true;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
