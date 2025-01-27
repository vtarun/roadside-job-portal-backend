const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findOne({ email: data.email });
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}