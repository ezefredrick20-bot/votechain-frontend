import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userNIN = localStorage.getItem("userNIN");

  if (!userNIN) {
    return <Navigate to="/login" />;
  }

  return children;
}