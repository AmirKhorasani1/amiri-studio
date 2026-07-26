import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../api/authApi";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/dashboard/login" replace />;
  }
  return children;
};

export default ProtectedRoute;