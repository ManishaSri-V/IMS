import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../Product/ProductItem";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [totalBelowReorder, setTotalBelowReorder] = useState(0);

  function totalStockValue() {
    const value = products.reduce(
      (sum, product) => Number(sum) + Number(product.current_stock),
      0
    );
    let totalBelowReorder = 0;
    products.forEach((product) => {
      if (product.current_stock < product.reorder_level) {
        totalBelowReorder++;
      }
    });
    setTotalStock(value);
    setTotalBelowReorder(totalBelowReorder);
  }

  // Fetch products
  const fetchProducts = async () => {
    const Presponse = await axios.get(
      "http://localhost:5000/api/product/products"
    );
    setProducts(Presponse.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    totalStockValue();
  }, [products]);

  return (
    <div className="dashboard-container">
      <div>
        <div className="inventory-box">
          <div className="title">Total products</div>
          <div className="value">{products.length}</div>
        </div>
        <div className="inventory-box">
          <div className="title">Total stock value</div>
          <div className="value">{totalStock}</div>
        </div>
        <div className="inventory-box">
          <div className="title">Products Below Reorder Level</div>
          <div className="value">{totalBelowReorder}</div>
        </div>
      </div>
      <div>
        <div className="flexbox">
          {products.map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                setProducts={setProducts}
                products={products}
                className="product-item"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
