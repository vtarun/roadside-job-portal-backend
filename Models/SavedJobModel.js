const mongoose = require("mongoose");

const savedjobSchema = new mongoose.Schema({
  job_id: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Job",
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true, // Ensure one entry per user
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
});

module.exports = mongoose.model("SavedJob", savedjobSchema);