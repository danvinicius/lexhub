import React from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = React.useContext(UserContext) || {};
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
