import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    console.log("User not authenticated. Redirecting to login.");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
