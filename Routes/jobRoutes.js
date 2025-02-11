const { postJob } = require("../Controllers/JobController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

// Save a Job (for a candidate)
router.post("/jobs", userVerification, postJob);

module.exports = router;
