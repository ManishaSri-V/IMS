import React, { useState } from "react";
import axios from "axios";
import "./Product.css";
import "../Button/Button.css";

const ProductItem = ({ product, setProducts, products }) => {
  const [currentProduct, setCurrentProduct] = useState({
    _id: product ? product._id : "",
    name: product ? product.name : "",
    sku: product ? product.sku : "",
    description: product ? product.description : "",
    price: product ? product.price : "",
    current_stock: product ? product.current_stock : "",
    reorder_level: product ? product.reorder_level : "",
    supplier_id: product ? product.supplier_id : "",
  });

  const [editMode, setEditMode] = useState(false);

  const updateProduct = async () => {
    const response = await axios.put(
      `http://localhost:5000/api/product/update/${currentProduct._id}`,
      currentProduct
    );

    console.log("Update happened successfully", response.data);
    if (response.data.success) {
      setProducts(
        products.map((item) =>
          item._id === currentProduct._id ? currentProduct : item
        )
      );
      setEditMode(false);
    }
  };

  const handleSubmit = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      updateProduct();
    }
  };

  const deleteProduct = async () => {
    const response = await axios.delete(
      `http://localhost:5000/api/product/delete/${currentProduct._id}`
    );

    if (response.data.success) {
      setProducts(products.filter((item) => item._id !== currentProduct._id));
    }
  };

  const handleDelete = () => {
    deleteProduct();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="product-item">
      {editMode ? (
        <>
          <div className="product-item-key">
            Name: &nbsp;
            <input
              type="text"
              name="name"
              value={currentProduct.name}
              onChange={handleChange}
            />
          </div>
          <div className="product-item-key">
            SKU: &nbsp;
            <input
              type="text"
              name="sku"
              value={currentProduct.sku}
              onChange={handleChange}
            />
          </div>
          <div className="product-item-key">
            Description: &nbsp;
            <input
              type="text"
              name="description"
              value={currentProduct.description}
              onChange={handleChange}
            />
          </div>
          <div className="product-item-key">
            Price: &nbsp;
            <input
              type="number"
              name="price"
              value={currentProduct.price}
              onChange={handleChange}
            />
          </div>
          <div className="product-item-key">
            Current Stock: &nbsp;
            <input
              type="number"
              name="current_stock"
              value={currentProduct.current_stock}
              onChange={handleChange}
            />
          </div>

          <div className="product-item-key">
            Reorder Level: &nbsp;
            <input
              type="number"
              name="reorder_level"
              value={currentProduct.reorder_level}
              onChange={handleChange}
            />
          </div>
          <div className="product-item-key">
            Supplier: &nbsp;
            <input
              type="number"
              name="supplier_id"
              value={currentProduct.supplier_id}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>
            <span className="product-item-key">SKU:</span>
            {product.sku}
          </p>
          <p>
            <span className="product-item-key">Description:</span>
            {product.description}
          </p>
          <p>
            <span className="product-item-key">Price:</span> {product.price}
          </p>
          <p>
            <span className="product-item-key">Current Stock:</span>
            {product.current_stock}
          </p>
          <p>
            <span className="product-item-key">Reorder Level:</span>
            {product.reorder_level}
          </p>
          <p>
            <span className="product-item-key">Supplier:</span>
            {product.supplier_id}
          </p>
        </>
      )}

      <button className="btn-custom btn-success" onClick={handleSubmit}>
        {editMode ? "Submit" : "Edit"}
      </button>
      <button className="btn-custom btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ProductItem;
