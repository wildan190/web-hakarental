// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getToken } from "../auth";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
