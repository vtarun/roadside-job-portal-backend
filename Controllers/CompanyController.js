const Company = require("../models/CompanyModel");

const createCompany = async (req, res, next) => {
    const { name, logo_url } = req.body;
  
    try {
      const newCompany = new Company({
        name,
        logo_url,
      });
      await newCompany.save();
      res.status(201).json({ message: "Company created successfully", company: newCompany });
      next();
    } catch (err) {
      res.status(500).json({ message: "Error creating company", error: err.message });
    }
  }

  module.exports = {createCompany}