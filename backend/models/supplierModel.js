const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = { Supplier };
