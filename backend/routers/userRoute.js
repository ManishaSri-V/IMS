const express = require("express");

const {
  getAllUsers,
  updateUserById,
  getAll,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);
router.get("/role", getAll);

module.exports = router;
