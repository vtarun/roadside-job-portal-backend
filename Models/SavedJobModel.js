const mongoose = require("mongoose");

const savedjobSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.Number,
    required: true,
    ref: "Jobs",
  },
  user_id: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically set to the current timestamp
  },
});

module.exports = mongoose.model("SavedJob", savedjobSchema);