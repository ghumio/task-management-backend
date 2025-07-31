const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Simple, modern MongoDB connection
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `✅ MongoDB connected successfully to: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
module.exports = connectDB;
