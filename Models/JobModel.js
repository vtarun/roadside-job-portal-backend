const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
  recruiter_id: {
    type: String,
    required: [true, "Recruiter ID is required"],
  },
  company_id: {
    type: mongoose.Schema.Types.Number,
    required: [true, "Company ID is required"],
    ref: "Companies", // Reference to the parent jobs table
  },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  requirements: {
    type: String,
    required: [true, "Requirements are required"],
  },
  isOpen: {
    type: Boolean,
    required: [true, "Experience is required"],
    default: true
  },
});

module.exports = mongoose.model("Job", jobSchema);