import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
