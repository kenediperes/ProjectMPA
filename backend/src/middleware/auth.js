// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // assuming Sequelize models
const { jwtSecret } = require('../config/jwt');

/**
 * Middleware to protect routes
 * Expects: Bearer <token> in Authorization header
 * On success: req.user = { id, role, ... }
 * On failure: returns 401 Unauthorized
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);

    // Optionally fetch fresh user data from DB to ensure user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    next(error); // pass unexpected errors to global handler
  }
};

/**
 * Optional: Role-based authorization middleware
 * Usage: authorize(['admin', 'manager'])
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };