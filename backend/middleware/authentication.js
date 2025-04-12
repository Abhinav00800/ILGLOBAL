const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    let token = req.header("Authorization")?.split(" ")[1] || req.cookies.token;
    if (!token) return res.status(401).json({ message: "Access denied" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid token" });
    }
  };

  module.exports={authenticate};