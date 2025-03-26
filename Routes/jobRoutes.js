const { postJob, deleteJob, getAllJobs, updateJobStatus, getJobById, getAppliedJobs, getCreatedJobs } = require("../Controllers/JobController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/post-job", userVerification,  postJob);
router.get("/get-jobs", userVerification, getAllJobs);
router.get("/created", userVerification, getCreatedJobs);
router.get("/applied", userVerification, getAppliedJobs);
router.get("/get-job/:job_id", userVerification, getJobById);
router.delete("/delete-job/:job_id", userVerification, deleteJob);
router.put("/update-job/:job_id", userVerification, updateJobStatus)

module.exports = router;
