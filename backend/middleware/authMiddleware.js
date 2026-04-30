const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Support both 'sub' (new) and 'id' (legacy) fields
      const userId = decoded.sub || decoded.id;
      
      req.user = await User.findById(userId).select('-password');
      if (!req.user) return res.status(401).json({ message: 'User not found' });
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  }
  return res.status(401).json({ message: 'No token' });
};

const admin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Không có quyền quản trị' });
};

const vendor = (req, res, next) => {
  if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin' || req.user.role === 'super_admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Không có quyền người bán (Vendor required)' });
};

const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'super_admin') {
    return next();
  }
  return res.status(403).json({ message: 'Yêu cầu quyền Super Admin' });
};

/**
 * Generic Ownership Check Middleware
 * @param {string} modelName - 'Product' | 'Order' | etc.
 * @param {string} ownerField - Field name that stores the owner ID (e.g., 'seller' or 'user')
 */
const checkOwnership = (modelName, ownerField = 'seller') => {
  return async (req, res, next) => {
    try {
      const Model = require(`../models/${modelName}`);
      const resource = await Model.findById(req.params.id);
      
      if (!resource) {
        return res.status(404).json({ message: `${modelName} not found` });
      }

      const isOwner = resource[ownerField] && resource[ownerField].toString() === req.user._id.toString();
      const isAdmin = req.user.role === 'admin' || req.user.role === 'super_admin';

      if (isOwner || isAdmin) {
        req.resource = resource; // Pass the resource to the controller to save a DB query
        return next();
      }

      return res.status(403).json({ 
        message: 'Bạn không có quyền thực hiện hành động này trên tài nguyên của người khác' 
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};

module.exports = { protect, admin, vendor, superAdmin, checkOwnership };
