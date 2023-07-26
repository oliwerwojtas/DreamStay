import { useAuth } from "../../hooks/useAuth";
//components
import { Spinner } from "./Spinner";
//utilities
import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "../../types/components/components";

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { loggedIn, checkingStatus } = useAuth();
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? children : <Navigate to="/welcome" />;
};
