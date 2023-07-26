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
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCheckingStatus(false);
      setInitialStatusChecked(true);

      if (user) {
        dispatch(Login(user.uid));
      } else {
        dispatch(Logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return { loggedIn, googleLoggedIn, githubLoggedIn, checkingStatus, initialStatusChecked };
};
