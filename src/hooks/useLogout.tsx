import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Logout } from "../store/authSlice";
import { useState } from "react";
import { SignupError } from "../types";
export const useLogout = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    setError(null);
    navigate("/login");

    try {
      await getAuth().signOut();

      dispatch(Logout());
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      throw error;
    }
  };

  return { logout, error };
};
