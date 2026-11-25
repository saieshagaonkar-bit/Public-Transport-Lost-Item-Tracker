
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

dotenv.config();

const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Configure CORS
const allowedOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map((o) => o.trim())
  : [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://localhost:3000',
      'http://127.0.0.1:8080',
    ];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production'
      ) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not permitted by CORS policy`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Authentication Rate Limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      'Too many authentication attempts from this IP. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'BackToYou Public Transport Lost & Found API',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/me', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

// 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

// Start the application only after database connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log('------------------------------------');
      console.log('[Server] BackToYou API started');
      console.log(`[Server] Running on port ${PORT}`);
      console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('------------------------------------');
    });

    return server;
  } catch (error) {
    console.error('[Server] Startup failed:', error.message);
    process.exitCode = 1;
    throw error;
  }
};

// Run only when this file is executed directly.
// This keeps automated tests from starting a real server.
if (require.main === module && process.env.NODE_ENV !== 'test') {
  startServer().catch(() => {
    process.exit(1);
  });
}

module.exports = app;
module.exports.startServer = startServer;
