import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ admin, children }) => {
  if (admin.role === "ADMIN" || admin.role === "SUPER_ADMIN") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
