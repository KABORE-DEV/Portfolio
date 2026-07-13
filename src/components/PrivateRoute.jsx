import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>; // ou un spinner
  }

  return currentUser ? children : <Navigate to="/login" />;
}