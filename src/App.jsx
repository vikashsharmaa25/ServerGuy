import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import UserDashboard from "./components/Dashboard/UserDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("user");
  });

  return (
    <div className="bg-[#2e2e2e]">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
