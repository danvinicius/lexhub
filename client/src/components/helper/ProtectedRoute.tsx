import React from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { logged } = React.useContext(UserContext) || {};
  return logged ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
