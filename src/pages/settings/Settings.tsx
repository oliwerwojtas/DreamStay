import { useState, ChangeEvent, FormEvent } from "react";
import { useLogout } from "../../hooks/useLogout";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ListingItem } from "../../components/ListingItem";
import { useFetchUserDocuments } from "../../hooks/useFetchUserDocuments";
import { Spinner } from "../../components/Spinner";

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
  const { listings, loading } = useFetchUserDocuments(auth.currentUser?.uid);
  console.log(listings);
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
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
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

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center text-sm md:text-lg">
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
          <button
            type="submit"
            className="flex mx-auto bg-green-600 px-8 text-white rounded hover:bg-green-700"
          >
            <Link to="/create" className="flex justify-center items-center px-8 py-2">
              <FcHome className="mr-2 text-2xl bg-red-200 rounded-full p-1" />
              Sell house
            </Link>
          </button>
        </div>
      </section>
      <div className="flex flex-col flex-wrap">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">My Listings</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-6 mx-auto mb-8">
              {listings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
