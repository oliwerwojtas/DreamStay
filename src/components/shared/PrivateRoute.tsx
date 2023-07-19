import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "./Spinner";
import { PrivateRouteProps } from "../../types";
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { loggedIn, checkingStatus } = useAuth();
  if (checkingStatus) {
    return <Spinner />;
  }
  return loggedIn ? children : <Navigate to="/welcome" />;
};
