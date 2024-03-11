const express = require("express");
const router = express.Router();
const { Employee, validateEmployee } = require("../models/employee");

// POST route to add a new employee
router.post("/", async (req, res) => {
  try {
    // Validate employee data
    const { error } = validateEmployee(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if employee with the same email exists
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res
        .status(409)
        .json({ message: "Employee with given email already exists!" });
    }

    // Create a new employee
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
