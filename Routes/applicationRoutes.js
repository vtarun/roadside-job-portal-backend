const {applyToJob, updateApplicationStatus, getApplications} = require("../Controllers/ApplicationController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

router.post('/apply-job', userVerification, applyToJob);
router.put('/update-application', userVerification, updateApplicationStatus);
router.get('/get-applications', userVerification, getApplications);

module.exports = router;

