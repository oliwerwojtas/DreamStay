import { GithubAuthProvider, getAuth, signInWithPopup, User } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../config";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
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
      className="w-12 h-12  rounded-full flex justify-center items-center border-gray-300 border-2 hover:bg-green-600 duration-300 ease-in-out hover:border-white"
      onClick={handleMediaAuth}
    >
      <AiFillGithub size={22} />
    </button>
  );
};
