import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./Page/DashboardPage";
import UserPage from "./Page/UserPage";
import ProductPage from "./Page/ProductPage";
import SupplierPage from "./Page/SupplierPage";
import OrderPage from "./Page/OrderPage";
import ReportPage from "./Page/ReportPage";
import NavBar from "./components/Header/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/supplier" element={<SupplierPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
