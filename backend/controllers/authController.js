const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Login attempt for: ${username}`);
    
    let user = await User.findOne({ username });
    
    // Auto-create admin if not exists (Debug/Initial Setup)
    if (!user && username === 'admin' && password === 'phanbongiatot123') {
      console.log('Auto-creating admin user...');
      user = await User.create({ username, password });
    }

    if (!user) {
      console.log('User not found in DB');
      return res.status(401).json({ message: 'Tài khoản không tồn tại' });
    }

    const isMatch = await user.matchPassword(password);
    console.log(`Password match: ${isMatch}`);

    if (isMatch) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Mật khẩu không chính xác' });
    }
  } catch (error) {
    console.error('AUTH ERROR:', error.message);
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};

// @desc    Register a new admin (optional, for initial setup)
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, password });
  if (user) {
    res.status(201).json({ _id: user._id, username: user.username, token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

module.exports = { authUser, registerUser };
