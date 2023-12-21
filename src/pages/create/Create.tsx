import { useState } from "react";
import { useDocument } from "../../hooks/useDocument";
import { useNavigate } from "react-router-dom";
//components
import { Spinner } from "../../components/shared/Spinner";
//utilities
import { toast } from "react-toastify";
import { FormDataCreate } from "../../types/others/others";
import { ChangeEvent, MouseEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Create = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const { addDocument } = useDocument("listings");

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
    images,
    smoke,
    meters,
  } = formData;

  if (loading) {
    return <Spinner />;
  }

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

    if (images.length > 4) {
      setLoading(false);
      toast.error("Maximum 4 images are allowed");
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
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL);
                console.log(downloadURL);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      });
    };

    const imgUrls = await Promise.all([...images].map((image) => storeImage(image))).catch(
      (error) => {
        setLoading(false);
        toast.error("Images not uploaded");
        throw error;
      }
    );
    console.log(images);
    console.log(imgUrls);
    try {
      const formDataCopy = {
        ...formData,
        imgUrls,
        timestamp: serverTimestamp(),
        userRef: auth.currentUser?.uid,
      };

      const { images, ...formDataCopyWithoutImages } = formDataCopy;

      await addDocument(formDataCopyWithoutImages);
      setLoading(false);
      toast.success("Offer created!");
      navigate("/settings");
    } catch (error) {
      setLoading(false);
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-4 mx-auto text-[#22292f]">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={handleSubmitForm}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            value="sale"
            onClick={handleTypeClick}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
            data-cy="sellButton"
          >
            sell
          </button>
          <button
            type="button"
            value="rent"
            onClick={handleTypeClick}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-[#22292f]"
                : "bg-[#ffcb74] text-[#22292f] hover:bg-[#dba548]"
            }`}
            data-cy="rentButton"
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
          data-cy="nameInput"
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
              data-cy="metersInput"
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
              data-cy="bedsInput"
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
              data-cy="bathsInput"
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
            data-cy="parkingButtonYes"
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
            data-cy="parkingButtonNo"
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
            data-cy="furnishedButtonYes"
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
            data-cy="furnishedButtonNo"
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
            data-cy="smokeButtonYes"
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
            data-cy="smokeButtonNo"
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
          data-cy="addressTextarea"
        />

        <p className="text-lg font-semibold">Description</p>
        <textarea
          id="description"
          value={description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
          data-cy="descriptionTextarea"
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
                data-cy="priceInput"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-700">The first image will be the cover (max 4)</p>
          <input
            type="file"
            id="images"
            onChange={handleChange}
            accept=".jpg,.png,.jpeg"
            multiple
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            data-cy="imageInput"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-[#ffcb74] hover:bg-[#dba548] text-[#22292f] font-medium text-sm uppercase rounded shadow-md  hover:shadow-lg focus:bg-[#dba548] focus:shadow-lg active:bg-[#dba548] active:shadow-lg transition duration-150 ease-in-out"
          data-cy="createListingButton"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
};
export default Create;
