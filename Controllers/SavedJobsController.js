const mongoose = require("mongoose");
const SavedJob = require("./../Models/SavedJobModel");
const Job = mongoose.models.Job || require("../Models/JobModel");

const getSavedJobs = async (req, res) => {
    const email = req.user.email;
    try {
      const savedJobs = await SavedJob.findOne({ email }).populate("job_id"); 
  
      if (!savedJobs) {
        return res.status(200).json({ message: "No saved jobs found", jobs: [] });
      }
  
      res.status(200).json({
        message: "Saved jobs fetched successfully",
        jobs: savedJobs.job_id, // Array of job details
      });
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  const saveOrRemoveJob = async (req, res) => {
    const { job_id } = req.body;
    const email = req.user.email;
    try {
      let savedJob = await SavedJob.findOne({ email });
  
      if (!savedJob) {
        // If user doesn't have any saved jobs, create a new entry
        savedJob = new SavedJob({ email, job_id: [job_id] });
        await savedJob.save();
      } else {
        // Check if job_id already exists
        const jobIndex = savedJob.job_id.indexOf(job_id);
  
        if (jobIndex === -1) {
          // If job_id is NOT present, push it
          savedJob.job_id.push(job_id);
        } else {
          // If job_id IS present, remove it
          savedJob.job_id.splice(jobIndex, 1);
        }
  
        // If the array is empty after removal, delete the document
        if (savedJob.job_id.length === 0) {
          await SavedJob.deleteOne({ email });
          return res.status(200).json({ message: "Job removed, no saved jobs left", jobs: [] });
        }
  
        await savedJob.save();
      }
  
      // Populate the job details from Job collection
      const jobDetails = await Job.find({ _id: { $in: savedJob.job_id } });
  
      res.status(200).json({
        message: "Saved jobs updated",
        savedJob,
        jobs: jobDetails, // Array of saved job details
      });
  
    } catch (error) {
      console.error("Error saving/removing job:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

module.exports = {getSavedJobs, saveOrRemoveJob};