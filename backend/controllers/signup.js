const User = require("../models/user.js")

const bcrypt = require("bcryptjs");

const SignupController= async (req, res) => {
    try {
      const { name, email, password} = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" , user:newUser});
    } catch (error) {
      res.status(500).json({ error: "Signup failed", details: error.message });
    }
  }

module.exports={SignupController};