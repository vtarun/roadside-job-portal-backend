const multer = require("multer");
const router = require("express").Router();

const {applyForJob, updateApplicationStatus, getApplications} = require("../Controllers/ApplicationController");
const { userVerification } = require("../Middlewares/AuthMiddleware");




// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/"); // Save files in 'uploads/resumes' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
  },
});

const upload = multer({ storage });

// Apply for a job (with file upload)
router.post("/apply-job", userVerification, upload.single("resume"), applyForJob);
router.put('/update-application', userVerification, updateApplicationStatus);
router.get('/get-applications', userVerification, getApplications);

module.exports = router;

