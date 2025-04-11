const Job = require("../models/JobModel");
const Application = require("../models/ApplicationModel");

const postJob = async (req, res, next) => {
  const { recruiter_id, company_id, title, description, location, requirements } = req.body;

  try {
    const newJob = new Job({ recruiter_id, company_id, title, description, requirements, location });
    await newJob.save();
    res.status(201).json({message: "Job posted successfully"});
  } catch (err) {
    res.status(500).json({ message: "Error saving job", error: err.message });
  }
}

const updateJobStatus = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const {isOpen} = req.body;
    const recruiter_id = req.user._id;
    const job = await Job.findById(job_id);

    if(!job) {
      return res.status(404).json({message: "Job not found"});
    }

    if(job.recruiter_id !== recruiter_id){
      return res.status(403).json({ message: "You can only update jobs you created!" });
    }

    job.isOpen = isOpen;
    await job.save();
    res.status(201).json({message: "Job status updated to closed", job});
  } catch (err) {
    res.status(500).json({ message: "Error saving job", error: err.message });
  }
};

const getJobById = async (req, res) => {
  try{
    const { job_id } = req.params;
    const job = await Job.findById(job_id)
      .populate({
          path: "applications",  // Reference to applications
          populate: { path: "candidate_id" } // Populate candidate details
      })
      .populate({
          path: "company_id", // Populate company details
          select: "name logo_url", // Select required fields
      })
      .exec();
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      return res.status(200).json({ message: "Jobs found successfully", job });
  }catch(err) {
    res.status(500).json({ message: "Error finding job", error: err.message });
  }
}

const getAllJobs = async (req, res) => {
  const { location, company_id, search } = req.query;
  let filters = {};

  if (location) {
    filters.location = location; // Match location
  }

  if(search) {
    filters.title = { $regex: search, $options: "i" };
  }

  if (company_id) {
    filters.company_id = company_id; // Match company
  }

  try {
    const jobs = await Job.find(filters).populate('company_id');
    if (!jobs) {
      return res.status(404).json({ message: "Job not found" });
    }

    const savedJobs = await SavedJob.findOne({ user_id });
    const savedJobsId = new Set()

    return res.status(200).json({ message: "Jobs found successfully", jobs });
  } catch (err) {
    return res.status(500).json({ message: "Error saving job", error: err.message });
  }
}

const deleteJob = async (req, res) => {
  try {
    const { job_id } = req.params; // Extract job_id from URL params
    
    const recruiter_id = req.user._id;

    const job = await Job.findById(job_id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    if(job.recruiter_id !== recruiter_id){
      return res.status(403).json({ message: "You can only delete job you created!" });
    }

    await Job.findOneAndDelete({ _id: job_id });

    await User.updateMany(
      { savedJobs: job_id },
      { $pull: { savedJobs: job_id } }
    );

    const remainingJobs = await Job.find();

    res.status(200).json({ message: "Job deleted successfully", jobs: remainingJobs });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};

const getAppliedJobs = async (req, res) => {
  try{
    const { _id } = req.user;
    const appliedJobs = await Application.find({candidate_id: _id}).populate("job_id");
    console.log("Applied Jobs Result:", appliedJobs);
    res.status(200).json({ success: true, jobs: appliedJobs });
  }catch(error){
    res.status(500).json({ message: "Error fetching applied jobs", error: error.message });
  }
}; 

const getCreatedJobs = async (req, res) => {
  try{
    const { _id } = req.user;
    const createdJobs = await Job.find({recruiter_id: _id});
    res.status(200).json({ success: true, jobs: createdJobs });
  }catch(error){
    res.status(500).json({ message: "Error fetching created jobs", error: error.message });
  }
};



module.exports = {postJob, getAllJobs, deleteJob, updateJobStatus, getJobById, getAppliedJobs, getCreatedJobs};
