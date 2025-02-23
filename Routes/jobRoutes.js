const { postJob, getJob, getAllJobs, updateJobStatus } = require("../Controllers/JobController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// Save a Job (for a candidate)
router.post("/post-job",  postJob);
router.get("/get-jobs", getAllJobs);
router.get("/get-job/:job_id", getJob);
router.delete("/delete-job/:job_id", getJob);
router.put("/close-job/:job_id", updateJobStatus)

module.exports = router;
