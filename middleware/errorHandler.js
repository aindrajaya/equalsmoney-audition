/*
 * -----------------------------------------------------------------------------
 * Error Handling Middleware - middleware/errorHandler.js
 * -----------------------------------------------------------------------------
 * This middleware provides centralized error handling for the application.
 * It logs errors and sends a standardized error response to the client.
 */
const logError = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.response ? err.response.status : 500;
  const message = err.response ? err.response.data.message : 'An unexpected error occurred';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { logError, errorHandler, logRequest };