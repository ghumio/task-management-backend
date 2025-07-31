const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Modern MongoDB connection with optimized settings
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10, // Maximum 10 connections in the pool
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
    });

    console.log(
      `✅ MongoDB connected successfully to: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
module.exports = connectDB;
