const { getSavedJobs, saveOrRemoveJob } = require("../Controllers/SavedJobsController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();


router.post("/update-jobs", userVerification, saveOrRemoveJob);
router.get("/", userVerification, getSavedJobs);


module.exports = router;