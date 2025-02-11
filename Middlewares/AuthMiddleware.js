const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.json({ status: false })
  }
  try{

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch(err){
    return res.status(403).json({ status: false, message: "Invalid token" });
  }
}