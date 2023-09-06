import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//utilities
import { getAuth } from "firebase/auth";
import { Logout } from "../store/authSlice";
import { useState } from "react";
import { SignupError } from "../types";
import { toast } from "react-toastify";

export const useLogout = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    setError(null);
    navigate("/welcome");
    setLoading(true);

    try {
      await getAuth().signOut();

      dispatch(Logout());
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  return { logout, loading, error };
};
