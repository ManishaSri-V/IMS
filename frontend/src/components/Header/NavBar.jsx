import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        IMS
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Dashboard <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/order">
              Order
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/product">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/supplier">
              Suppliers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/report">
              Report
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
