
const mongoose = require('mongoose');
const dns = require('dns');

// Use public DNS servers for MongoDB Atlas SRV lookup
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI is missing from the .env file');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return conn;
  }  catch (error) {
  console.error('[MongoDB] Error:', error.message);

  if (error.reason && error.reason.servers) {
    for (const [address, server] of error.reason.servers) {
      console.log('\nServer:', address);
      console.log('Error:', server.error?.message || 'No detailed error available');
    }
  }

  throw error;
}
};

const closeDB = async () => {
  await mongoose.disconnect();
  console.log('[MongoDB] Disconnected');
};

module.exports = { connectDB, closeDB };
