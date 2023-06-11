import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SignupError, LoginData } from "../types";

import { toast } from "react-toastify";
export const useLogin = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    setError(null);
    setIsPending(true);

    try {
      const { email, password } = data;
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigate("/");
      }
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setIsPending(false);
      navigate("/");
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setIsPending(false);
      throw error;
    }
  };

  return { login, error, isPending };
};
