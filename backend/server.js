const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB=require("./config/mongodb.js");
const jobRegisterRoutes = require("./routes/jobregister");
const loginRoutes= require("./routes/login.js")
const signUpRoutes= require("./routes/signup.js")
const {authenticate}=require('./middleware/authentication.js')

// Middleware
const allowedOrigins = [
    "https://www.ilgshipping.com",
    "http://localhost:5173"             
  ];
  
app.use(cors({origin:process.env.Origin, credentials: true}));
app.use(express.json());
app.use(cookieParser());

//mongodb connect
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Backend API");
});
app.use("/login",loginRoutes);
app.use("/signup",signUpRoutes);
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});
// app.use("/jobregister",authenticate,jobRegisterRoutes);
app.use("/jobregister",jobRegisterRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
