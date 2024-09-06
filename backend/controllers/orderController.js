const { Order } = require("../models/orderModel");
const { Product } = require("../models/productModel");
const { Inventory, StockValue } = require("../models/reportingModel");
const client = require("../redis");

const checkStock = async (req, res, product_id, quantity) => {
  const product = await Product.find({ _id: product_id });
  // Check if stock is below reorder level
  if (
    product[0].current_stock - quantity < product[0].reorder_level &&
    product[0].current_stock - quantity > 0
  ) {
    const newOrder = new Order({
      product_id,
      quantity: product[0].stock,
      order_date: String(Date.now()).split("T")[0],
      status: "Completed",
    });
    await newOrder.save();

    product[0].current_stock =
      product[0].current_stock + product[0].stock - quantity;
    await product[0].save();
    //since product is restocked, we need to update newInventory
    const newInventory = new Inventory({
      product_id,
      movement_type: "restock",
      quantity: product[0].stock,
    });
    await newInventory.save();
  } else {
    // Check if current_stock is insufficient
    if (product[0].current_stock - quantity < 0) {
      return res.status(401).json({
        success: false,
        message: `Cannot place the order, there are ${product[0].current_stock} items left in stock`,
      });
    } else {
      // Update stock if enough items are available
      product[0].current_stock = product[0].current_stock - quantity;
    }
    await product[0].save();
  }
};

const UpdatestockValue = async (req, res, quantity) => {
  try {
    const latestStockValue = await StockValue.find({}).sort({ _id: -1 });
    const prevStock =
      latestStockValue.length > 0 ? latestStockValue[0].total_stock_value : 0;
    const newStockValue = new StockValue({
      total_stock_value: prevStock - quantity,
    });
    await newStockValue.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStockLevel = async (id, value, quantity) => {
  if (value == "Cancel") {
    const product = await Product.find({ _id: id });
    product[0].current_stock += quantity;
    await product[0].save();
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { product_id, quantity, order_date } = req.body;
    // Check stock availability and proceed with order creation
    await checkStock(req, res, product_id, quantity);
    if (!res.headersSent) {
      // Ensure the stock is updated before proceeding
      await UpdatestockValue(req, res, quantity);
      // If checkStock did not send a response, continue to create the order
      const newOrder = new Order({ product_id, quantity, order_date });
      await newOrder.save();
      const newInventory = new Inventory({
        product_id,
        inventory_type: "sale",
        quantity,
      });
      await newInventory.save();
      res.status(201).json({
        success: true,
        message: "created a order successfully",
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateOrderById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const order = await Product.findByIdAndUpdate(id, body);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await User.findById(id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    order.isDeleted = true;
    order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.changeStatus = (value) => {
  return async (req, res) => {
    try {
      const id = req.query.id;
      const order = await Order.find({ _id: id });
      updateStockLevel(id, value, order.quantity);
      UpdatestockValue(req, res, order.quantity);
      const response = await Order.updateOne({ _id: id }, { status: value });
      if (!response.matchedCount) {
        res.status(404).json({
          success: false,
          message: "cannot find the order",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "order updated successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
