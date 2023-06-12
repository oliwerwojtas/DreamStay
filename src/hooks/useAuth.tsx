import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { checkAuthStatus } from "../store/authSlice";
import { RootState } from "../store/store";

export const useAuth = () => {
  const [checkingStatus, setCheckingStatus] = useState(true);

  const dispatch: ThunkDispatch<RootState, null, never> = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  useEffect(() => {
    dispatch(checkAuthStatus()).then(() => {
      setCheckingStatus(false);
    });
  }, [dispatch]);

  return { loggedIn, checkingStatus };
};
