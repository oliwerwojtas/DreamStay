import { GithubAuthProvider, getAuth, signInWithPopup, User } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../config";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export const MediaAuthGithub = () => {
  const navigate = useNavigate();
  const handleMediaAuth = async () => {
    try {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
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
      navigate("/");
      console.log(user);
    } catch (error) {
      toast.error("Could not authorize with Github");
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleMediaAuth}
      className="px-2 py-1 bg-green-600 text-white w-1/3 rounded"
    >
      Github
    </button>
  );
};
