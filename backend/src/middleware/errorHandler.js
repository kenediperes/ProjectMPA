// backend/src/middleware/errorHandler.js
const { ValidationError, DatabaseError } = require('sequelize');

/**
 * Global error handling middleware
 * Must be placed after all routes
 */
const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  // Handle Sequelize validation errors (400 Bad Request)
  if (err instanceof ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.errors.map(e => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Handle Sequelize database errors (e.g., unique constraint)
  if (err instanceof DatabaseError) {
    statusCode = 400;
    message = 'Database Error';
    // Optionally parse native error messages
  }

  // Handle custom application errors (e.g., NotFoundError)
  if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = err.message;
  }

  // Log error (could be integrated with Winston or morgan)
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.stack || message}`);

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;