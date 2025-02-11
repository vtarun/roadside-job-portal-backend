const router = require("express").Router();

const { userVerification } = require("../Middlewares/AuthMiddleware");
const { createCompany } = require("../Controllers/CompanyController");

// Create a new Company
router.post("/company", userVerification, createCompany);

module.exports = router;
