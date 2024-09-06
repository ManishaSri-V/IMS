const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  current_stock: {
    type: Number,
    required: true,
  },
  reorder_level: {
    type: Number,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Supplier",
  },
  stock: {
    type: Number,
    default: function () {
      return this.current_stock;
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
