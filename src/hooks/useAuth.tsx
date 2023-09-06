import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//utilities
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RootState, AuthStatus } from "../types/auth/auth";
import { Login, Logout } from "../store/authSlice";

export const useAuth = (): AuthStatus => {
  const dispatch = useDispatch();
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
  const [initialStatusChecked, setInitialStatusChecked] = useState<boolean>(false);

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const googleLoggedIn = useSelector((state: RootState) => state.auth.googleLoggedIn);
  const githubLoggedIn = useSelector((state: RootState) => state.auth.githubLoggedIn);
  const emailLoggedIn = useSelector((state: RootState) => state.auth.emailLoggedIn);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCheckingStatus(false);
      setInitialStatusChecked(true);

      if (user) {
        if (user.providerData && user.providerData.length > 0) {
          const loginMethod = user.providerData[0].providerId;
          dispatch(Login(loginMethod));
        }
      } else {
        dispatch(Logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return {
    loggedIn,
    emailLoggedIn,
    googleLoggedIn,
    githubLoggedIn,
    checkingStatus,
    initialStatusChecked,
  };
};
