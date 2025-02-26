const { postJob, getJob, getAllJobs, updateJobStatus } = require("../Controllers/JobController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// Save a Job (for a candidate)
router.post("/post-job", userVerification,  postJob);
router.get("/get-jobs", userVerification, getAllJobs);
router.get("/get-job/:job_id", userVerification, getJob);
router.delete("/delete-job/:job_id", userVerification, getJob);
router.put("/update-job/:job_id", userVerification, updateJobStatus)

module.exports = router;
