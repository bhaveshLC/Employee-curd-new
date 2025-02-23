const Joi = require("joi");

const employeeSchemaValidations = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  department: Joi.string()
    .min(2)
    .max(50)
    .valid("HR", "Engineering", "Sales", "Marketing", "Others")
    .required(),
  salary: Joi.number().min(1000).required(),
  addedBy: Joi.string().required(),
});

module.exports = employeeSchemaValidations;
