import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, UserCredential, User } from "firebase/auth";
import { SignupError, LoginData } from "../types";
// import { useAuthContext } from "../context/useAuthContext";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Login } from "../store/authSlice";

export const useLogin = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data: LoginData) => {
    setError(null);
    setIsPending(true);

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

      dispatch(Login(userCredential.user.uid));
      toast.success("Login successful!", {
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
