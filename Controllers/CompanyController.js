const Company = require("../models/CompanyModel");

const createCompany = async (req, res) => {
  const { name } = req.body;
  const logo_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Save the new company
    const newCompany = new Company({ name, logo_url });
    await newCompany.save();

    // Fetch all companies after adding the new one
    const allCompanies = await Company.find();

    res.status(201).json({
      message: "Company created successfully",
      companies: allCompanies, // Send all companies in response
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating company", error: err.message });
  }
};

const getCompany = async (req, res) => {
  try {
    const companies = await Company.find(); // Fetch all companies
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies", error: err.message });
  }
}

module.exports = {createCompany, getCompany}