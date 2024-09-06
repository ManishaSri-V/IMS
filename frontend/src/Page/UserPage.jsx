import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/User/User.css";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-container">
      <h2>Users</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-item" key={user.id}>
            {user.username} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
