require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};