import React, { useState } from "react";
import axios from "axios";
import "./Supplier.css"; // Import the CSS file
import "../Button/Button.css";

const SupplierForm = () => {
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({
      ...newSupplier,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/supplier/add", newSupplier);
      setNewSupplier({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding supplier", error);
    }
  };

  return (
    <div className="supplier-form-container">
      <form onSubmit={handleSubmit} className="supplier-form">
        <label>
          Name:&nbsp;
          <input
            type="text"
            name="name"
            value={newSupplier.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </label>
        <label>
          Phone:&nbsp;
          <input
            type="phone"
            name="phone"
            value={newSupplier.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
        </label>
        <label>
          Address:&nbsp;
          <input
            type="text"
            name="address"
            value={newSupplier.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </label>
        <button className="btn-custom btn-primary" type="submit">
          Add Supplier
        </button>
      </form>
    </div>
  );
};

export default SupplierForm;
