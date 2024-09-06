import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import "./Order.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get("http://localhost:5000/api/order/orders");
    setOrders(response.data.data);
  };

  console.log("These are my Orders", orders);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h2>All Orders</h2>
      <div className="flexbox">
        {orders.map((order, _) => {
          return (
            <OrderItem order={order} setOrders={setOrders} orders={orders} />
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
