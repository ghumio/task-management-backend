// routes/protected.js
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

router.get("/dashboard", auth, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

module.exports = router;
