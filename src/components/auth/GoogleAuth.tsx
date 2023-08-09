import { useNavigate } from "react-router-dom";
//components
import { Button } from "../shared/Button";
//utilities
import { GoogleAuthProvider, getAuth, signInWithPopup, User } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../config";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { BsGoogle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Login } from "../../store/authSlice";

export const MediaAuthGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMediaAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          displayName: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      dispatch(Login("google"));
      navigate("/");
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`${errorMessage}`);
    }
  };
  return (
    <Button
      className="w-12 h-12 rounded-full justify-center duration-300 ease-in-out"
      onClick={handleMediaAuth}
    >
      <BsGoogle size={20} data-cy="google-login" />
    </Button>
  );
};
