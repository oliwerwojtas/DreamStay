import { useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useNavigate, useParams } from "react-router-dom";
//components
import { Spinner } from "../../components/shared/Spinner";
//utilities
import { toast } from "react-toastify";
import { FormDataCreate } from "../../types";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ChangeEvent, MouseEvent, FormEvent, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config";
import { v4 as uuidv4 } from "uuid";

const EditDocument = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { updateDocument } = useDocument("listings");
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataCreate>({
    id: uuidv4(),
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    regularPrice: 0,
    images: [],
    imgUrls: [],
    userRef: auth.currentUser?.uid,
    smoke: false,
    breakfast: false,
    meters: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    address,
    furnished,
    description,
    regularPrice,

    smoke,
    breakfast,
    meters,
  } = formData;

  const params = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchListing = async () => {
      try {
        if (params.id) {
          const docRef = doc(db, "listings", params.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFormData({
              id: docSnap.id,
              type: docSnap.data().type,
              name: docSnap.data().name,
              bedrooms: docSnap.data().bedrooms,
              bathrooms: docSnap.data().bathrooms,
              parking: docSnap.data().parking,
              furnished: docSnap.data().furnished,
              address: docSnap.data().address,
              description: docSnap.data().description,
              regularPrice: docSnap.data().regularPrice,
              images: docSnap.data().images,
              imgUrls: docSnap.data().imgUrls,
              userRef: docSnap.data().userRef,
              smoke: docSnap.data().smoke,
              breakfast: docSnap.data().breakfast,
              meters: docSnap.data().meters,
            });
            setLoading(false);
          }
        } else {
          navigate("/");
          toast.error("Listing ID is undefined");
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(errorMessage);
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    let boolean: boolean | null = null;

    if (value === "true") {
      boolean = true;
    }
    if (value === "false") {
      boolean = false;
    }
    if (id === "images") {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const fileArray = Array.from(files) as File[];
        setFormData((prevState: typeof formData) => ({
          ...prevState,
          images: fileArray,
        }));
      }
    } else {
      setFormData((prevState: typeof formData) => ({
        ...prevState,
        [id]: boolean ?? value,
      }));
    }
  };

  const handleTypeClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    setFormData((prevState: typeof formData) => ({
      ...prevState,
      type: value,
    }));
  };
  const handleYesNoClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.target as HTMLButtonElement;
    setFormData((prevState: typeof formData) => ({
      ...prevState,
      [id]: value === "true",
    }));
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataCopy = {
        ...formData,

        timestamp: serverTimestamp(),
      };

      const { images, ...formDataCopyWithoutImages } = formDataCopy;

      await updateDocument(formDataCopyWithoutImages, params.id || "");
      setLoading(false);
      toast.success("Edited!");
      navigate("/settings");
    } catch (error) {
      setLoading(false);
      toast.error("Error editing offer");
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto text-[#22292f]">
      <button className="flex mb-4 items-center gap-2 px-3 py-2 mt-4 font-medium rounded-md text-[#22292f] bg-[#ffcb74] hover:bg-[#dba548] transition-colors">
        <AiOutlineArrowLeft /> <Link to="/">Back to list</Link>
      </button>
      <h1 className="text-3xl text-center mt-6 font-bold">Edit</h1>
      <form onSubmit={handleSubmitForm}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={handleTypeClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={handleTypeClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Meters</p>
            <input
              type="number"
              id="meters"
              value={meters}
              onChange={handleChange}
              min="1"
              max="1250"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={handleChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={handleChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value="true"
            onClick={handleYesNoClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value="false"
            onClick={handleYesNoClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-[#22292f]" : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value="true"
            onClick={handleYesNoClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="furnished"
            value="false"
            onClick={handleYesNoClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Breakfast</p>
        <div className="flex">
          <button
            type="button"
            id="breakfast"
            value="true"
            onClick={handleYesNoClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !breakfast
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="breakfast"
            value="false"
            onClick={handleYesNoClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              breakfast
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Smoke</p>
        <div className="flex">
          <button
            type="button"
            id="smoke"
            value="true"
            onClick={handleYesNoClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !smoke ? "bg-white text-[#22292f]" : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="smoke"
            value="false"
            onClick={handleYesNoClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              smoke ? "bg-white text-[#22292f]" : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
          >
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">
          Address <span className="text-sm font-normal"> (format: Limes Rd 4, London)</span>
        </p>
        <textarea
          id="address"
          value={address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg font-semibold">Description</p>
        <textarea
          id="description"
          value={description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />

        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">Regular price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="text"
                id="regularPrice"
                value={regularPrice}
                onChange={handleChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3  bg-[#ffcb74] hover:bg-[#dba548] text-[#22292f] font-medium text-sm uppercase rounded shadow-md  hover:shadow-lg focus:bg-[#dba548] focus:shadow-lg active:bg-[#dba548] active:shadow-lg transition duration-150 ease-in-out"
        >
          Edit Listing
        </button>
      </form>
    </main>
  );
};

export default EditDocument;
