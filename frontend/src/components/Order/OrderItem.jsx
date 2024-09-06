import React, { useState } from "react";
import axios from "axios";
import "./Order.css"; // Import the CSS file
import "../Button/Button.css";
const OrderItem = ({ order, setOrders, orders }) => {
  const [currentOrder, setCurrentOrder] = useState({
    _id: order ? order._id : "",
    product_id: order ? order.product_id : "",
    quantity: order ? order.quantity : "",
    order_date: order ? order.order_date : "",
    status: order ? order.status : "",
  });

  const [editMode, setEditMode] = useState(false);

  const updateOrder = async () => {
    const response = await axios.put(
      `http://localhost:5000/api/order/update/${currentOrder._id}`,
      currentOrder
    );

    console.log("Update happened successfully", response.data);
    if (response.data.success) {
      setOrders(
        orders.map((item) =>
          item._id === currentOrder._id ? currentOrder : item
        )
      );
      setEditMode(false);
    }
  };

  const handleSubmit = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      updateOrder();
    }
  };

  const deleteOrder = async () => {
    const response = await axios.delete(
      `http://localhost:5000/api/order/delete/${currentOrder._id}`
    );

    if (response.data.success) {
      setOrders(orders.filter((item) => item._id !== currentOrder._id));
    }
  };

  const handleDelete = () => {
    deleteOrder();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCurrentOrder({ ...currentOrder, [e.target.name]: e.target.value });
  };

  return (
    <div className="order-item">
      {editMode ? (
        <>
          <div className="order-item-key">
            Product-Id:
            <input
              type="text"
              name="product_id"
              value={currentOrder.product_id}
              onChange={handleChange}
            />
          </div>
          <div className="order-item-key">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={currentOrder.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="order-item-key">
            Date:
            <input
              type="date"
              name="order_date"
              value={currentOrder.order_date}
              onChange={handleChange}
            />
          </div>
          <div className="order-item-key">
            Status:
            <input
              type="text"
              name="status"
              value={currentOrder.status}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <>
          <p>
            <span className="order-item-key">Product-Id:</span>
            {order.product_id}
          </p>
          <p>
            <span className="order-item-key">Quantity:</span>
            {order.quantity}
          </p>
          <p>
            <span className="order-item-key">Date:</span> {order.order_date}
          </p>
          <p>
            <span className="order-item-key">Status:</span>
            {order.status}
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

export default OrderItem;
