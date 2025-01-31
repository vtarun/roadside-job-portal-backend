const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user.email);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    const userResponse = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      createdAt: user.createdAt,
    };

    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user: userResponse, token });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user.email);
     res.status(201).json({ message: "User logged in successfully", success: true, token });
     next()
  } catch (error) {
    console.error(error);
  }
}