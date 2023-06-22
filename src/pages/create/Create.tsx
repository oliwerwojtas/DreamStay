import { useState, ChangeEvent, MouseEvent, FormEvent } from "react";
import { Spinner } from "../../components/Spinner";
import { toast } from "react-toastify";

import { FormDataCreate } from "../../types";
import { useDocument } from "../../hooks/useAddDocument";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const Create = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const { addDocument } = useDocument("listings");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataCreate>({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    // latitude: 1,
    // longitude: 1,
    images: [],
    imgUrls: [],
    userRef: auth.currentUser?.uid,
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
    offer,
    regularPrice,
    discountedPrice,
    images,
    // latitude,
    // longitude,
  } = formData;

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

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.target as HTMLButtonElement;
    setFormData((prevState: typeof formData) => ({
      ...prevState,
      type: value,
    }));
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (images.length > 3) {
      setLoading(false);
      toast.error("Maximum 3 images are allowed");
      return;
    }

    const storeImage = async (image: any) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser?.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch(
      (error) => {
        setLoading(false);
        toast.error("Images not uploaded");
        return;
      }
    );
    console.log(imgUrls);
    try {
      const formDataCopy = {
        ...formData,
        imgUrls,

        timestamp: serverTimestamp(),
        userRef: auth.currentUser?.uid,
      };

      delete formDataCopy.images;
      // const formDataCopy = { ...formData, timestamp: serverTimestamp() };
      await addDocument(formDataCopy);
      setLoading(false);
      toast.success("Offer created!");
      navigate("/settings");
    } catch (error) {
      setLoading(false);
      toast.error("Error creating offer");
      console.error("Error creating offer", error);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={handleSubmitForm}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            value="sale"
            onClick={handleButtonClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent" ? "bg-white text-black" : "bg-green-600 text-white"
            }`}
          >
            sell
          </button>
          <button
            type="button"
            value="rent"
            onClick={handleButtonClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale" ? "bg-white text-black" : "bg-green-600 text-white"
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
            onClick={handleButtonClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-green-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value="false"
            onClick={handleButtonClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-green-600 text-white"
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
            onClick={handleButtonClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-green-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="furnished"
            value="false"
            onClick={handleButtonClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-green-600 text-white"
            }`}
          >
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          id="address"
          value={address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />

        {/* <div className="flex space-x-4">
          <div>
            <p className="text-lg font-semibold">Latitude:</p>
            <input
              type="number"
              id="latitude"
              value={latitude}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Longitude:</p>
            <input
              type="number"
              id="longitude"
              value={longitude}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded"
            />
          </div>
        </div> */}

        <p className="text-lg font-semibold">Description</p>
        <textarea
          id="description"
          value={description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg font-semibold">Offer</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value="true"
            onClick={handleButtonClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-green-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            value="false"
            onClick={handleButtonClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-green-600 text-white"
            }`}
          >
            no
          </button>
        </div>
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
        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Discounted price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="text"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={handleChange}
                  min="50"
                  max="400000000"
                  required={offer}
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
        )}
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">The first image will be the cover (max 3)</p>
          <input
            type="file"
            id="images"
            onChange={handleChange}
            accept=".jpg,.png,.jpeg"
            multiple
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-green-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
};
