const express = require("express");

const {
  deleteProductById,
  getProductById,
  updateProductById,
  getAllProducts,
  addProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.get("/products", getAllProducts);
router.get("/:id", getProductById);
router.put("/update/:id", updateProductById);
router.delete("/delete/:id", deleteProductById);

module.exports = router;
