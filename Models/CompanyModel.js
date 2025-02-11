const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Company name is required"],
  },
  logo_url: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
});

module.exports = mongoose.model("Company", companySchema);