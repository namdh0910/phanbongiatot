const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      // Generic message to prevent username enumeration
      return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không chính xác' });
    }

    const isMatch = await user.matchPassword(password);
    
    // Self-fix: Nếu đây là user đầu tiên và chưa có role admin, thì tự nâng cấp
    if (isMatch && user.role !== 'admin') {
      const userCount = await User.countDocuments();
      if (userCount === 1) {
        user.role = 'admin';
        await user.save();
      }
    }

    if (isMatch) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        vendorInfo: user.vendorInfo,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không chính xác' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// @desc    Register a new vendor
// @route   POST /api/auth/register-vendor
const registerVendor = async (req, res) => {
  try {
    const { username, password, storeName, phone, address, description } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const user = await User.create({
      username,
      password,
      role: 'vendor',
      vendorInfo: {
        storeName,
        phone,
        address,
        description,
        isApproved: false
      }
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new admin — PROTECTED, chỉ dùng lần đầu setup
const registerUser = async (req, res) => {
  try {
    // Chặn đăng ký nếu đã có admin trong DB
    const adminCount = await User.countDocuments();
    if (adminCount > 0) {
      return res.status(403).json({ message: 'Không được phép đăng ký thêm admin' });
    }

    const { username, password } = req.body;
    if (!username || !password || password.length < 8) {
      return res.status(400).json({ message: 'Password phải từ 8 ký tự trở lên' });
    }

    const user = await User.create({ username, password, role: 'admin' });
    if (user) {
      res.status(201).json({ _id: user._id, username: user.username, token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: 'Không thể tạo tài khoản' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// @desc    Get all vendors
// @route   GET /api/auth/vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' }).select('-password').sort({ createdAt: -1 });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve/Reject vendor
// @route   PUT /api/auth/vendors/:id/approve
const approveVendor = async (req, res) => {
  try {
    const { isApproved } = req.body;
    
    // Tìm user để tính toán ngày hết hạn nếu cần
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    const updateData = {
      'vendorInfo.isApproved': isApproved
    };

    // Nếu duyệt, gia hạn mặc định 30 ngày nếu chưa có hạn
    if (isApproved && (!user.vendorInfo.trialExpiresAt || user.vendorInfo.trialExpiresAt < new Date())) {
      updateData['vendorInfo.trialExpiresAt'] = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    await User.findByIdAndUpdate(req.params.id, { $set: updateData });
    return res.json({ message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Extend vendor trial/pro
// @route   PUT /api/auth/vendors/:id/extend
const extendVendor = async (req, res) => {
  try {
    const { days } = req.body;
    const user = await User.findById(req.params.id);
    if (user && user.role === 'vendor') {
      const currentExpire = new Date(user.vendorInfo.trialExpiresAt || Date.now());
      const newExpire = new Date(currentExpire.getTime() + days * 24 * 60 * 60 * 1000);
      
      user.vendorInfo.trialExpiresAt = newExpire;
      user.vendorInfo.isApproved = true; // Gia hạn là tự động duyệt luôn
      await user.save();
      
      res.json({ message: `Đã gia hạn thêm ${days} ngày cho gian hàng`, newExpire });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người bán' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      if (req.body.password) {
        user.password = req.body.password;
      }
      if (req.body.vendorInfo) {
        user.vendorInfo = { ...user.vendorInfo, ...req.body.vendorInfo };
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
        vendorInfo: updatedUser.vendorInfo,
      });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authUser, registerUser, registerVendor, getVendors, approveVendor, extendVendor, getProfile, updateProfile };
