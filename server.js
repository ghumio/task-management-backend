const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
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
          "https://your-frontend-url.netlify.app",
          "https://your-frontend-url.vercel.app",
        ]
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to the Task Manager API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
