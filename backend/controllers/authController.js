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

    const user = await User.create({ username, password });
    if (user) {
      res.status(201).json({ _id: user._id, username: user.username, token: generateToken(user._id) });
    } else {
      res.status(400).json({ message: 'Không thể tạo tài khoản' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = { authUser, registerUser, registerVendor };
