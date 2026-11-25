
const errorHandler = (err, req, res, next) => {
  // If response has already started, delegate to Express
  if (res.headersSent) {
    return next(err);
  }

  // Log errors for developers
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[Error] ${err.name || 'Error'}: ${err.message}`);
  }

  // Invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: 'Requested resource not found',
    });
  }

  // Duplicate MongoDB record
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';

    return res.status(400).json({
      success: false,
      message: `A record with that ${field} already exists`,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');

    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Invalid JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
    });
  }

  // Expired JWT
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Authentication session expired',
    });
  }

  // Determine HTTP status
  const statusCode = err.statusCode || err.status || 500;

  const response = {
    success: false,
    message:
      statusCode >= 500 && process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message || 'Internal Server Error',
  };

  // Include stack only during development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

module.exports = errorHandler;
