const Joi = require("joi");
const userSchemaValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
module.exports = userSchemaValidation;
