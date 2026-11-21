const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Initialize Database Connection
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(async () => {
    // If in dev and items collection is empty, automatically seed initial transit dataset
    try {
      const Item = require('./models/Item');
      const count = await Item.countDocuments();
      if (count === 0) {
        console.log('[Database] Empty dataset detected. Initializing demo transit records...');
        const seedAll = require('./utils/seedData');
        await seedAll();
      }
    } catch (err) {
      console.warn(`[Database] Auto-seed check notice: ${err.message}`);
    }
  }).catch((err) => {
    console.error('[Database] Failed to connect to MongoDB:', err.message);
  });
}

// Configure CORS
const allowedOrigins = process.env.FRONTEND_ORIGIN
  ? process.env.FRONTEND_ORIGIN.split(',').map((o) => o.trim())
  : ['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:3000', 'http://127.0.0.1:8080'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman) or matching origin
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
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

// Rate Limiter for Authentication Routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP, please try again in 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Route Mounts
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'BackToYou Public Transport Lost & Found API',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/claims', require('./routes/claimRoutes'));
app.use('/api/me', require('./routes/userRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

// 404 Handler for Unrecognized API Routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// Centralized Error Handler Middleware
app.use(errorHandler);

// Start Server if not imported by test suite
const PORT = process.env.PORT || 5000;
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(
      `[Server] BackToYou API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
    );
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Process] Unhandled Rejection: ${err.message}`);
  if (server) {
    server.close(() => process.exit(1));
  }
});

module.exports = app;
