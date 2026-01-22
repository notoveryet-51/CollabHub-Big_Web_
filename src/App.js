import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// --- Existing Imports (Now with .jsx extensions) ---
import AuthForm from "./components/AuthForm.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import CreateRequest from "./components/CreateRequest.jsx";
import Chatbot from "./components/chatbot.jsx";

// --- NEW IMPORT ---
import EventFinder from "./components/EventFinder.jsx"; 

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Navbar hidden only on login page */}
      {location.pathname !== "/login" && <Navbar />}

      {/* Chatbot visible on all pages */}
      <Chatbot />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />

        {/* Protected Routes */}
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/CreateRequest"
          element={
            <PrivateRoute>
              <CreateRequest />
            </PrivateRoute>
          }
        />

        {/* --- NEW ROUTE FOR EVENT FINDER --- */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventFinder />
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;