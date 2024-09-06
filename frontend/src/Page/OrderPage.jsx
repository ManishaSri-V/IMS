import React from "react";
import OrderList from "../components/Order/Orderlist";
import Order from "../components/Order/Order";

const OrderPage = () => {
  return (
    <div>
      <Order />
      <OrderList />
    </div>
  );
};

export default OrderPage;
