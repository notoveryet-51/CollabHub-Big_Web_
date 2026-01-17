import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">Collab-Hub</div>
      <div className="nav-links">
        <Link className="nav-item" to="/Home">🏠 Home</Link>
        <Link className="nav-item" to="/dashboard">📊 Dashboard</Link>
        <Link className="nav-item" to="/profile">👤 Profile</Link>
        <Link className="nav-item" to="/CreateRequest">➕ Create Request</Link>
        {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
      </div>
    </nav>
  );
};

export default Navbar;