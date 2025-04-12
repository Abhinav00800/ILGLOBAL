const { generateToken } = require("../controllers/generateToken.js");
const User = require("../models/user.js")

const bcrypt = require("bcryptjs");

const LoginController= async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
      // Generate token
      const token = generateToken(user);
  
      // Set token in cookie (HTTP-only, Secure)
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      });
  
      // Send token in response header
      res.header("Authorization", `Bearer ${token}`);
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: "Login failed", details: error.message });
    }
  }

module.exports={LoginController};