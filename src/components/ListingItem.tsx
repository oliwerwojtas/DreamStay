import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useNavigate } from "react-router-dom";
//components
import { ListingItemProps } from "../types/components/components";
import { LazyImage } from "./LazyImage";
import { FavoriteButton } from "./FavouriteButton";
//utilities
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { getAuth } from "firebase/auth";
import { AiOutlineClose } from "react-icons/ai";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import { motion } from "framer-motion";
import { RootState } from "../types/auth/auth";
import { BiBed } from "react-icons/bi";
import { MdOutlineBathroom } from "react-icons/md";
import { toast } from "react-toastify";

export const ListingItem = ({ listing, id, isModalOpen }: ListingItemProps) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const timestamp = listing.timestamp;
  const daysFromToday = timestamp ? dayjs().diff(dayjs(timestamp.toDate()), "day") : null;
  const { deleteDocument, isLoading } = useDocument("listings");
  const favoritesRedux = useSelector((state: RootState) => state.favorites.favoritesItems);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(price);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser?.uid) {
          const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);
          const docSnapshot = await getDoc(userFavoritesRef);

          if (docSnapshot.exists()) {
            const favoritesData = docSnapshot.data();
            setFavorites(favoritesData.favorites);
          } else {
            setFavorites([]);
          }
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(`${errorMessage}`);
      }
    };

    fetchData();
  }, [auth.currentUser, favoritesRedux]);

  const handleDelete = async () => {
    await deleteDocument("listings", id);
    if (!isLoading) {
      window.location.reload();
    }
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };
  const addToFavoritesHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (auth.currentUser?.uid) {
      const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);
      const updatedFavorites = [...favorites];

      if (!updatedFavorites.includes(id)) {
        updatedFavorites.push(id);
      }

      try {
        await setDoc(userFavoritesRef, { favorites: updatedFavorites });
        dispatch(addToFavorites(updatedFavorites));
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  const removeFromFavoritesHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (auth.currentUser?.uid) {
      const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);
      const updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);

      try {
        await setDoc(userFavoritesRef, { favorites: updatedFavorites });
        dispatch(removeFromFavorites([id]));
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} layout>
      <li
        className="bg-[white] text-[#22292f] w-[17rem] relative z-10 flex flex-col justify-centershadow-md hover:shadow-xl rounded-md overflow-hidden transistion-shadow duration-150"
        data-cy="listingItem"
      >
        {isModalOpen ? (
          auth.currentUser?.uid !== listing.userRef ? (
            <button
              className="bg-[#ffcb74] px-4 py-4 rounded-full w-6 h-6 flex justify-center items-center absolute right-2 top-2 z-20 cursor-pointer"
              onClick={removeFromFavoritesHandler}
            >
              <div className="relative">
                <AiOutlineClose size={22} className="text-red-600" />
              </div>
            </button>
          ) : null
        ) : (
          auth.currentUser?.uid !== listing.userRef && (
            <FavoriteButton
              isFavorite={favorites.includes(id)}
              addToFavoritesHandler={addToFavoritesHandler}
            />
          )
        )}
        <Link to={`/details/${id}`}>
          {listing.imgUrls && listing.imgUrls.length > 0 ? (
            <LazyImage
              imageUrl={listing.imgUrls[0]}
              alt="house photo"
              className="h-[170px] w-full object-cover hover:scale-105 opacity-1 transition-all opacity-1 duration-200 ease-in"
            />
          ) : (
            <div className="h-[170px] w-full bg-gray-200 flex items-center justify-center">
              No Image Available
            </div>
          )}

          {daysFromToday !== null && (
            <span className="absolute top-2 left-2 bg-[#ffcb74] text-[#22292f] uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
              {daysFromToday} days ago
            </span>
          )}

          <div className="w-full p-[10px]">
            <div className="flex items-center ">
              <MdLocationOn className="flex h-4 w-8 text-[#ffcb74]" />
              <p className="font-semibold text-sm mb-[2px] truncate">{listing.address}</p>
            </div>
            <p className="font-semibold mt-2 text-lg truncate">{listing.name}</p>
            <p>
              {formatPrice(listing.regularPrice)} $ {listing.type === "rent" && " / month"}
            </p>
            <div className="flex h-[4rem] gap-2 items-end mb-1">
              <div className="flex items-center space-x-1 w-[6rem] justify-around">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                <span className="bg-[#ffcb74] rounded-full w-6 h-6 flex justify-center items-center">
                  <BiBed size={24} className="p-1" />
                </span>
              </div>

              <div>
                <div className="flex items-center space-x-1 w-[6rem] justify-around">
                  {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}

                  <span className="bg-[#ffcb74] rounded-full w-6 h-6 flex justify-center items-center">
                    <MdOutlineBathroom size={24} className="p-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {auth.currentUser?.uid === listing.userRef && (
          <>
            <FaTrash
              size={20}
              className="absolute bottom-2 right-2 cursor-pointer text-red-500"
              onClick={handleDelete}
            />
            <MdEdit
              size={20}
              className="absolute bottom-2 right-8 cursor-pointer"
              onClick={handleEdit}
            />
          </>
        )}
      </li>
    </motion.div>
  );
};
