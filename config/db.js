const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  MONGO_URI not set — skipping MongoDB connection');
      return;
    }

    // await mongoose.connect('mongodb://localhost:27017/node_auth');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.code, err.message);
    // Log full error for debugging
    console.error('Full error:', JSON.stringify(err, null, 2));
    // Do not exit the process here; let the caller decide how to handle DB failures.
    throw err;
  }
};

module.exports = connectDB;
