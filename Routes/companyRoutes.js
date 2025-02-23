const router = require("express").Router();

const { userVerification } = require("../Middlewares/AuthMiddleware");
const { createCompany, getCompany } = require("../Controllers/CompanyController");
const multer = require("multer");
const path = require("path");

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files inside "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

// File Filter (Only Images Allowed)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Multer Middleware
const upload = multer({ storage, fileFilter });

// Get all companies
router.get("/get-companies", getCompany );

// Create Company with File Upload
router.post("/create", upload.single("logo"), createCompany);


module.exports = router;
