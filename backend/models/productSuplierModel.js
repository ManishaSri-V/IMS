const { mongoose } = require("mongoose");

const productSupplierSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    require: true,
  },
});

const ProductSupplier = mongoose.model(
  "ProductSupplier",
  productSupplierSchema
);

module.exports = { ProductSupplier };
