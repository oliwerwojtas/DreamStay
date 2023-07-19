import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Login, Logout } from "../store/authSlice";
import { AuthStatus } from "../types";
export const useAuth = (): AuthStatus => {
  const dispatch = useDispatch();
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [initialStatusChecked, setInitialStatusChecked] = useState(false);

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
  }, []);

  return { loggedIn, googleLoggedIn, githubLoggedIn, checkingStatus, initialStatusChecked };
};
