const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Job", // Reference to the parent jobs table
  },
  candidate_id: {
    type: mongoose.Schema.Types.ObjectId,     
    required: [true, "Candidate ID is required"],
    ref: "User",
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: ["applied", "interviewing", "rejected", "hired"], // Optional: predefined statuses
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
    type: Number,
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