const Job = require("../models/JobModel");

const postJob = async (req, res, next) => {
  const { recruiter_id, company_id, title, description,location, requirements } = req.body;

  try {
    const newJob = new Job({ recruiter_id, company_id, title, description, requirements,location });
    await newJob.save();
    res.status(201).json({message: "Job posted successfully"});
  } catch (err) {
    res.status(500).json({ message: "Error saving job", error: err.message });
  }
}

const updateJobStatus = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const recruiter_id = req.user.email;
  
    const job = await Job.findById(job_id);

    if(!job) {
      return res.status(404).json({message: "Job not found"});
    }
    
    if(job.recruiter_id !== recruiter_id){
      return res.status(403).json({ message: "You can only update jobs you created!" });
    }

    job.isOpen = false;
    await job.save();
    res.status(201).json({message: "Job status updated to closed", job});
  } catch (err) {
    res.status(500).json({ message: "Error saving job", error: err.message });
  }
};

const getJob = async (req, res) => {
  try{
    const job = await Job.find();
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Jobs found successfully", job });
  }catch(err) {
    res.status(500).json({ message: "Error finding job", error: err.message });
  }
}

const getAllJobs = async (req, res) => {
  const { location, company_id, title } = req.query;
  let filters = {};

  if (location) {
    filters.location = location; // Match location
  }

  if(title) {
    filters.title = title; //Match title
  }

  if (company_id) {
    filters.company_id = company_id; // Match company
  }

  try {
    const jobs = await Job.find(filters);
    if (!jobs) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Jobs found successfully", jobs });
  } catch (err) {
    return res.status(500).json({ message: "Error saving job", error: err.message });
  }
}

const deleteJob = async (req, res) => {
  try {
    const { job_id } = req.params; // Extract job_id from URL params

    const job = await Job.findOneAndDelete({ _id: job_id });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const remainingJobs = await Job.find();

    res.status(200).json({ message: "Job deleted successfully", jobs: remainingJobs });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};



module.exports = {postJob, getAllJobs, deleteJob, updateJobStatus, getJob};
