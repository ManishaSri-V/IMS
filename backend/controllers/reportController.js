const { Order } = require("../models/orderModel");
const { User } = require("../models/userModel");
const { Product } = require("../models/productModel");

exports.noOfOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.noOfUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.produsctsBelowRLevel = async (req, res) => {
  try {
    const allProducts = Product.find({});
    const produsctsBelowRLevel = [];
    for (let product in allProducts) {
      if (product[current_stock] < product[reorder_level]) {
        produsctsBelowRLevel.push(product);
      }
    }
    res.status(200).json({
      success: true,
      data: produsctsBelowRLevel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
