const express = require("express");

const {
  noOfOrders,
  noOfUsers,
  produsctsBelowRLevel,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/orders", noOfOrders);
router.get("/users", noOfUsers);
router.get("/products", produsctsBelowRLevel);

module.exports = router;
