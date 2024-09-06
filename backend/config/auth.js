const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = "manisha123";
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    secretkey,
    {
      expiresIn: "48h",
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRETKEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
