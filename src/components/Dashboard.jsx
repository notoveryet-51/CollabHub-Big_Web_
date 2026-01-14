// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email);
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {userName}!</h1>
      <p>You are now logged in.</p>
    </div>
  );
};

export default Dashboard;
