const mongoose = require('mongoose');

let memoryServer = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (uri && !uri.includes('your_mongodb_connection_string') && !uri.includes('<username>')) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`[MongoDB] Connected to database: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`[MongoDB] Atlas/Remote connection failed: ${err.message}.`);
      if (process.env.NODE_ENV === 'production') {
        throw err;
      }
      console.log(`[MongoDB] Falling back to embedded local development database engine...`);
    }
  }

  // Development / Test fallback using mongodb-memory-server
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const memUri = memoryServer.getUri();
    const conn = await mongoose.connect(memUri);
    console.log(`[MongoDB] Connected to in-memory development database: ${memUri}`);
    return conn;
  } catch (err) {
    console.error(`[MongoDB] Database initialization error: ${err.message}`);
    throw err;
  }
};

const closeDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = { connectDB, closeDB };
