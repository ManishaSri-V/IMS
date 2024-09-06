const { Supplier } = require("../models/supplierModel");
const { ProductSupplier } = require("../models/productSuplierModel");

exports.createSupplier = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const newSupplier = new Supplier({ name, phone, address });
    await newSupplier.save();
    res.status(201).json({
      success: true,
      message: "created a supplier successfully",
      supplier: newSupplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const allSuppliers = await Supplier.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      data: allSuppliers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const id = req.params;
    const { name } = req.body;

    const response = await Supplier.findByIdAndUpdate({ _id: id, name: name });

    res.status(200).json({
      success: true,
      message: "Supplier updated successfully",
    });
    console.log(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const id = req.params;
    const response = await Supplier.find(id, { isDeleted: true });

    res.status(200).json({
      success: true,
      message: "successfully deleted the supplier",
    });
    console.log(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.supplierProductDetails = async (req, res) => {
  try {
    const P_S_details = await ProductSupplier.find({})
      .populate("product_id")
      .populate("supplier_id");
    P_S_details;
    res.status(200).json({
      success: true,
      message: "successfully fetched all the details in populated raw format",
      data: P_S_details,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
