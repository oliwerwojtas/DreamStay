import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { loggedIn, checkingStatus } = useAuth();
  if (checkingStatus) {
    return <h3>loading</h3>;
  }
  return loggedIn ? children : <Navigate to="/login" />;
};
