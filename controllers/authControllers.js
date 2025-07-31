const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
module.exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body; // Add email here

  try {
    // Check if user already exists (by username OR email)
    let user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this username or email",
      });
    }

    // Create new user
    user = new User({
      username,
      email, // Add email here
      password, // Hash the password
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);

    // Handle specific validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// Login user - update to allow login with username OR email
module.exports.loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Debug: Log what we received
  console.log("🔍 Login attempt:", {
    username,
    email,
    password: password ? "***" : "missing",
  });

  try {
    // Find user by username OR email
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    // Debug: Log if user was found
    // console.log("🔍 User found:", user ? "Yes" : "No");
    if (user) {
      console.log("🔍 User details:", {
        id: user._id,
        username: user.username,
        email: user.email,
        hasPassword: !!user.password,
      });
    }

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    // console.log("🔍 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);

    if (!isMatch) {
      // console.log("❌ Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    // console.log("✅ Login successful");
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
