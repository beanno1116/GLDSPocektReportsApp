import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";



const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (auth.token){
    return children;
  }
  return <Navigate to="/login" replace />
}

export default ProtectedRoute;