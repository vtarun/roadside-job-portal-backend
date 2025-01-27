const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
  job_id: {
    type: mongoose.Schema.Types.Number,
    required: true,
    ref: "Jobs", // Reference to the parent jobs table
  },
  candidate_id: {
    type: String,
    required: [true, "Candidate ID is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: ["applied", "in-review", "shortlisted", "rejected", "hired"], // Optional: predefined statuses
    default: "applied", // Default status
  },
  resume: {
    type: String, // Path to the uploaded resume
    required: [true, "Resume is required"],
  },
  skills: {
    type: String,
    required: [true, "Skills are required"],
  },
  experience: {
    type: String,
    required: [true, "Experience is required"],
  },
  education: {
    type: String,
    required: [true, "Education details are required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
});

module.exports = mongoose.model("Application", applicationSchema);