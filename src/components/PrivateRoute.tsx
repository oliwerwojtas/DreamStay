import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "./Spinner";
interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { loggedIn, checkingStatus } = useAuth();
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? children : <Navigate to="/login" />;
};
