// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import DashboardPage from "./DashboardPage";
import { useAuth } from "./AuthContext";

function App() {
  const { user } = useAuth() || {}; // Safeguard in case useAuth returns undefined

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/dashboard"
          element={<DashboardPage loggedInUserId={user ? user.id : null} />} // Pass user ID to DashboardPage
        />
      </Routes>
    </Router>
  );
}

export default App;



