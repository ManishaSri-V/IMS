const { Product } = require("../models/productModel");
const { StockValue } = require("../models/reportingModel");
const { ProductSupplier } = require("../models/productSuplierModel");

const redis = require("redis");
const client = redis.createClient();
client.on("error", (err) => {
  console.log("There was an error connecting to my redis cluster", err);
});

client.connect();

// Publisher client
const publisher = redis.createClient();

// Subscriber client
const subscriber = redis.createClient();

// Connect Publisher and Subscriber
publisher.connect();
subscriber.connect();

// Subscribe to a channel
subscriber.subscribe("productChannel", (message) => {
  console.log("Received message:", message);
  // You can now notify connected clients, update the frontend, etc.
});

const UpdatestockValue = async (req, res, quantity) => {
  try {
    const latestStockValue = await StockValue.find({}).sort({ _id: -1 });
    const prevStock =
      latestStockValue.length > 0 ? latestStockValue[0].total_stock_value : 0;
    console.log({ prevStock, quantity });
    const newStockValue = new StockValue({
      total_stock_value: prevStock + quantity,
    });

    await newStockValue.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      price,
      current_stock,
      reorder_level,
      supplier_id,
    } = req.bod;
    y;
    await client.set("newProductAdded", "true");

    const newProduct = new Product({
      name,
      sku,
      description,
      price,
      current_stock,
      reorder_level,
      supplier_id,
    });
    await newProduct.save();

    await publisher.publish(
      "productChannel",
      `New product added: ${newProduct.name}`
    );

    const productRedis = JSON.stringify({
      name,
      sku,
      description,
      price,
      current_stock,
      reorder_stock,
    });
    try {
      await client.sAdd("products", productRedis);
      await client.set("newProductAdded", "false");
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error while inserting user inside Redis",
      });
    }
    const newProductSupplier = new ProductSupplier({
      product_id: newProduct._id,
      supplier_id,
    });
    await newProductSupplier.save();

    UpdatestockValue(req, res, current_stock);

    res.status(201).json({
      success: true,
      message: "created a product successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const newProductAdded = await client.get("newProductAdded");
  try {
    if (newProductAdded == "true") {
      const products = await Product.find({});
      res.status(200).json({
        success: true,
        data: products,
      });
    }
    if (newProductAdded == "false") {
      // fetch and return all the products from Redis
      const products = await client.sMembers("products");

      return res.status(200).json({
        success: true,
        data: JSON.parse(products),
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, body);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await User.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    product.isDeleted = true;
    product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
