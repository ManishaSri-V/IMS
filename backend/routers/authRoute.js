const express = require("express");
const { validate } = require("../middlewares/validate");
const {
  createUserSchema,
  loginSchema,
} = require("../middlewares/validateSchemas");

const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", validate(createUserSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
