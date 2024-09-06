import React, { useState } from "react";
import axios from "axios";
import "./User.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const login = { username, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        login
      );
      const { token } = response.data;

      // Save token and username in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      // Navigate to the Dashboard
      navigate("/");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={userLogin}>
        <div>
          <label>
            {" "}
            UserName: &nbsp;
            <input
              type="text"
              value={username}
              onChange={handleName}
              required
            />
          </label>
        </div>

        <div>
          <label>
            {" "}
            Password: &nbsp;
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              required
            />
          </label>
        </div>

        <button className="btn-custom btn-primary" type="submit">
          {" "}
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
