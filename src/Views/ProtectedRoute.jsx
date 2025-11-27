import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useApiClient } from "../Api/Api";



const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (auth.getToken()){
    return children;
  }
  return <Navigate to="/login" replace />
}

export default ProtectedRoute;