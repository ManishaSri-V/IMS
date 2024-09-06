const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(10).max(30).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  createUserSchema,
  loginSchema,
};
