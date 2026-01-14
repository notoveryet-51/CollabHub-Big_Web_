import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard"; // the dashboard component we created
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
