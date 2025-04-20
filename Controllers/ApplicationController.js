const mongoose = require("mongoose");
const Job = require("../models/JobModel");
const Application = require("../models/ApplicationModel");

const applyForJob = async (req, res) => {
	try{
		const { job_id, candidate_id, name, experience, skills, education } = req.body;
		const job = await Job.findById(new mongoose.Types.ObjectId(job_id));
		
		if(!job) {
			return res.status(404).json({message: "Job not found"});
		}
		
		const existingApplication = await Application.findOne({
			job_id: new mongoose.Types.ObjectId(job_id), 
			candidate_id: new mongoose.Types.ObjectId(candidate_id)
		});

		if(existingApplication) {
			return res.status(400).json({message: "You have already applied for this job"});
		}

		const resume = req.file ? req.file.path : null;

		if (!resume) {
	      return res.status(400).json({ message: "Resume is required" });
	    }

	    const newApplication = new Application({
	    	job_id,
	    	candidate_id,
	    	name,
	    	experience,
	    	skills,
	    	education,
	    	resume
	    });

	    await newApplication.save();

	    // 🔹 Update Job's applications array
        await Job.findByIdAndUpdate(job_id, {
            $push: { applications: newApplication._id }
        });
        
	    res.status(201).json({message: "Application submitted successfully", application: newApplication})

	}catch(err) {
		 res.status(500).json({ message: "Error fetching applications", error: err?.message });
	}
}

const updateApplicationStatus = async (req, res) => {
	const { id } = req. params;
	const { status } = req.body;
	const recruiter_id = req.user._id;
	try{
		const jobs = await Job.find({recruiter_id: new mongoose.Types.ObjectId(recruiter_id)});
		const allApplicationIds = jobs.flatMap(job => job.applications.map(appId => appId.toString()));
		if(!allApplicationIds.includes(id)){
			return res.status(401).json({message: "Not authorize to update application status."});
		}
		const updatedApplication = await Application.findByIdAndUpdate(id, {status}, {new: true});
		if (!updatedApplication) {
	      return res.status(404).send({ error: "Application not found" });
	    }
		res.status(201).json({message: "Application updated successfully", application: updatedApplication})
	}catch(err){
		res.status(500).json({ message: "Error fetching applications", error: err?.message });
	}
}

const getApplications = async (req, res) => {

}

module.exports = {applyForJob, getApplications, updateApplicationStatus};