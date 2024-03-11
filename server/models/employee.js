const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: [{ type: String }],
  image: { type: String }, // Assuming you store image URLs
});

const Employee = mongoose.model("Employee", employeeSchema);

const employeeSchemaValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().pattern(new RegExp("[0-9]{10}")).required(),
  designation: Joi.string().valid("HR", "Manager", "Sales").required(),
  gender: Joi.string().valid("Male", "Female").required(),
  course: Joi.array()
    .items(Joi.string().valid("MCA", "BCA", "BSC"))
    .min(1)
    .required(),
  image: Joi.string().uri(),
});

// Validator function
function validateEmployee(employee) {
  return employeeSchemaValidator.validate(employee);
}

module.exports = { Employee, validateEmployee };
