const Job = require("../models/JobModel");

const postJob = async (req, res, next) => {
    const { job_id, candidate_id } = req.body;
  
    try {
      const job = await Job.findOne({ job_id });
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      // Assuming saved jobs are stored in a separate 'SavedJobs' collection, you can extend here
      // For simplicity, we will add a saved field to the job document in this example.
      job.savedBy = candidate_id;
      await job.save();
  
      res.status(200).json({ message: "Job saved successfully", job });
      next();
    } catch (err) {
      res.status(500).json({ message: "Error saving job", error: err.message });
    }
  }

// const updateJob = async (req, res, next) => {
//     try{

//         next();
//     } catch(err){

//     }    
// }

module.exports = {postJob}
