import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import "./Product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/product/products"
    );
    setProducts(response.data.data);
  };

  console.log("These are my Products", products);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div className="flexbox">
        {products.map((product, _) => {
          return (
            <ProductItem
              product={product}
              setProducts={setProducts}
              products={products}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
