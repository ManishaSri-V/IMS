const express = require("express");

const {
  addOrder,
  getAllOrders,
  updateOrderById,
  getOrderById,
  deleteOrderById,
  changeStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/add", addOrder);
router.put("/update/:id", updateOrderById);
router.get("/orders", getAllOrders);
router.get("/order", getOrderById);
router.delete("/delete/:id", deleteOrderById);
router.put("/setCompleted", changeStatus("Completed"));
router.put("/setCancel", changeStatus("Cancelled"));

module.exports = router;
