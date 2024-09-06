import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Product.css"; // Import the CSS file

const ProductForm = () => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [current_stock, setCurrentStock] = useState("");
  const [reorder_level, setReorderLevel] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/supplier/suppliers"
      );
      setSuppliers(response.data.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSkuChange = (e) => {
    setSku(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleCurrentStockChange = (e) => {
    setCurrentStock(e.target.value);
  };
  const handleReorderLevelChange = (e) => {
    setReorderLevel(e.target.value);
  };

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const product = {
      name: name,
      sku: sku,
      description: description,
      price: price,
      current_stock: current_stock,
      reorder_level: reorder_level,
      supplier_id: selectedSupplier,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/add",
        product
      );
      console.log(response);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="product-form-container">
      <form onSubmit={createProduct} className="product-form">
        <label className="label">
          Name:&nbsp;
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
        <label className="label">
          SKU:&nbsp;
          <input
            type="text"
            name="sku"
            placeholder="Stock Keeping Unit"
            value={sku}
            onChange={handleSkuChange}
            required
          />
        </label>
        <label className="label">
          Description:&nbsp;
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <label className="label">
          Price:&nbsp;
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </label>
        <label className="label">
          Current Stock:&nbsp;
          <input
            type="number"
            name="current_stock"
            placeholder="Product Current Stock"
            value={current_stock}
            onChange={handleCurrentStockChange}
          />
        </label>
        <label className="label">
          Reorder Level:&nbsp;
          <input
            type="number"
            name="reorder_level"
            value={reorder_level}
            placeholder="Reorder Level"
            onChange={handleReorderLevelChange}
          />
        </label>

        <label className="label">
          Supplier:&nbsp;
          <select
            name="supplier_id"
            value={selectedSupplier}
            onChange={handleSupplierChange}
            required
          >
            <option value="" disabled>
              Select a supplier
            </option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name} (Phone: {supplier.phone})
              </option>
            ))}
          </select>
        </label>

        <button className="btn-custom btn-primary" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
