const { mongoose } = require("mongoose");

const inventorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  inventory_type: {
    type: String,
    enum: ["restock", "sale"],
  },
  quantity: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const stockValueHistorySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  total_stock_value: {
    type: Number,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);
const StockValue = mongoose.model("StockValue", stockValueHistorySchema);

module.exports = { Inventory, StockValue };
