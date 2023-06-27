import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Logout } from "../store/authSlice";
import { useState } from "react";
import { SignupError } from "../types";
export const useLogout = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    setError(null);
    navigate("/login");
    setLoading(true);

    try {
      await getAuth().signOut();

      dispatch(Logout());
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setLoading(false);
      throw error;
    }
  };

  return { logout, loading, error };
};
