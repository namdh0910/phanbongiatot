const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (typeof next === 'function') {
        return next();
      } else {
        console.error('CRITICAL: protect middleware next is not a function');
        return res.status(500).json({ message: 'Lỗi hệ thống: Middleware protect' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    if (typeof next === 'function') {
      return next();
    } else {
      console.error('CRITICAL: admin middleware next is not a function');
      return res.status(500).json({ message: 'Lỗi hệ thống: Middleware admin' });
    }
  } else {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
