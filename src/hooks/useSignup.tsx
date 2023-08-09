import { useState } from "react";
import { useNavigate } from "react-router-dom";
//utilities
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { SignupError, SignupResult } from "../types";
import { SignupData } from "../types/auth/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config";
import { toast } from "react-toastify";

export const useSignup = () => {
  const [error, setError] = useState<SignupError | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (data: SignupData): Promise<SignupResult> => {
    setError(null);
    setLoading(true);

    try {
      const { email, password, displayName } = data;
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: displayName,
      });

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
      });
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setLoading(false);

      navigate("/");
      return { user };
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError({ message: errorMessage });
      setLoading(false);
      toast.error(`${errorMessage}`);
    }
  };

  return { signup, error, loading };
};
