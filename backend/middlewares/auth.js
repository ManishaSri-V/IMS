const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/userModel");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "72h",
    }
  );
};

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
  if (!token) {
    res.status(401).json({
      message: "Token is invalid or expired",
    });
  }
};

const authorize = (role) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      await User.findById(id, (err, data) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "This user is not authorised to call this specific API",
          });
        } else {
          if (role === data.role) {
            next();
          }
        }
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

module.exports = { generateToken, protect, authorize };
