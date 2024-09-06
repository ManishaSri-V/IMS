const express = require("express");

const {
  createSupplier,
  deleteSupplier,
  updateSupplier,
  getAllSuppliers,
  supplierProductDetails,
} = require("../controllers/suppliercontroller");

const router = express.Router();

router.post("/add", createSupplier);
router.get("/suppliers", getAllSuppliers);
router.put("/update/:id", updateSupplier);
router.delete("/delete/:id", deleteSupplier);
router.get("/supplierProductDetails", supplierProductDetails);

module.exports = router;
