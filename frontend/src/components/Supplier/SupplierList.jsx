import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Supplier.css";
import "../Button/Button.css";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/supplier/delete/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div>
      <h2>Suppliers</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li className="supplier-item" key={supplier._id}>
            <p className="supplier-item-key">Name: {supplier.name}</p>
            <p className="supplier-item-key">Phone: {supplier.phone}</p>
            <p className="supplier-item-key">Address: {supplier.address}</p>
            <button
              className="btn-custom btn-danger"
              onClick={() => handleDelete(supplier._id)}
            >
              Delete Supplier
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
