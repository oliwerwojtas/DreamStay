import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//utilities
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { LoginData } from "../types/auth/auth";
import { SignupError } from "../types";
import { toast } from "react-toastify";
import { Login } from "../store/authSlice";

export const useLogin = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data: LoginData) => {
    setError(null);
    setLoading(true);

    try {
      const { email, password } = data;
      const auth = getAuth();
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }

      dispatch(Login("email"));
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setLoading(false);
      toast.error(`${errorMessage}`);
    }
  };

  return { login, error, loading };
};
