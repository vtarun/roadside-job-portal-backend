const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Your username is required"],
  },
  lastname: {
    type: String,
    required: [true, "Your username is required"],
  },
  role: {
    type: String,
    default: null
  },
  profilePic: {
    type: String, // Store image path
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }]
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);