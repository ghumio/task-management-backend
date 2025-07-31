const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const taskRoutes = require("./routes/task");

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// CORS Configuration for Production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://dreamy-clafoutis-924e6d.netlify.app",
          "https://your-frontend-url.vercel.app",
        ]
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

// Add request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Body:", {
      ...req.body,
      password: req.body.password ? "***" : undefined,
    });
  }
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to the Task Manager API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  // Default error response
  let error = { ...err };
  let message = err.message || "Server Error";
  let statusCode = err.statusCode || 500;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
