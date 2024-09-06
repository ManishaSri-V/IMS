const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product_id: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
