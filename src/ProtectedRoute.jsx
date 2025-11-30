import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>
      No access. Contact Admin.
    </h2>;
  }

  return children;
};

export default ProtectedRoute;
