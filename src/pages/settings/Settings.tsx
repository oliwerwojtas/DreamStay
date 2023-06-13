import { useState, ChangeEvent, FormEvent } from "react";
import { useLogout } from "../../hooks/useLogout";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config";
interface FormData {
  name: string;
  email: string;
}
export const Settings = () => {
  const auth = getAuth();
  const { logout } = useLogout();
  const [changeDetail, setChangeDetail] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: auth.currentUser?.displayName || "",
    email: auth.currentUser?.email || "",
  });

  const { name, email } = formData;

  const handleEditData: () => void = () => {
    setChangeDetail((prevState) => !prevState);
  };

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        if (auth.currentUser.displayName !== name) {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });

          const userDocRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(userDocRef, {
            displayName: name,
          });
        }
        toast.success("Profile updated!");
      }
    } catch (error) {
      toast.error("could not");
    }
  };

  const handleSpanClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    handleEditData();
    if (changeDetail) {
      handleSubmitData(e as unknown as FormEvent<HTMLFormElement>);
    }
  };
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-1/2 mt-6 px-3">
        <form>
          <input
            type="text"
            id="name"
            value={name}
            disabled={!changeDetail}
            onChange={handleChangeData}
            className="w-full px-4 p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"
          />
          <input
            type="email"
            id="email"
            value={email}
            disabled={!changeDetail}
            className="w-full px-4 p-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"
          />

          <div className="flex justify-between whitespace-nowrap text-lg md:text-sm">
            <p className="flex items-center mb-6">
              Do you want to change your name?
              <span
                onClick={handleSpanClick}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? "Apply change" : "Edit"}
              </span>
            </p>
            <p
              onClick={logout}
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
            >
              Sign out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
