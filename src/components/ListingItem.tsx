import { FormDataCreate2 } from "../types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "./FavouriteButton";

import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import { useDispatch } from "react-redux";

interface ListingItemProps {
  listing: FormDataCreate2["data"];
  id: string;
}

export const ListingItem = ({ listing, id }: ListingItemProps) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const daysFromToday = dayjs().diff(dayjs(listing.timestamp.toDate()), "day");
  const { deleteDocument, isLoading } = useDocument("listings");
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(price);
  };

  useEffect(() => {
    if (auth.currentUser?.uid) {
      const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);

      getDoc(userFavoritesRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const favoritesData = docSnapshot.data();
            setFavorites(favoritesData.favorites);
          } else {
            setFavorites([]);
          }
        })
        .catch((error) => {
          console.error("Error getting user favorites:", error);
        });
    }
  }, [auth.currentUser]);

  const handleDelete = async () => {
    await deleteDocument("listings", id);
    if (!isLoading) {
      window.location.reload();
    }
  };

  const handleEdit = () => {
    console.log(id);
    navigate(`/edit/${id}`);
  };
  const addToFavoritesHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (auth.currentUser?.uid) {
      const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);

      let updatedFavorites = [];

      if (favorites && favorites.includes(id)) {
        dispatch(removeFromFavorites([id]));
        updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
      } else {
        dispatch(addToFavorites([id]));
        updatedFavorites = [...favorites, id];
      }

      try {
        await setDoc(userFavoritesRef, { favorites: updatedFavorites });
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  return (
    <li className="bg-white w-[17rem] relative z-10 flex flex-col justify-centershadow-md hover:shadow-xl rounded-md overflow-hidden transistion-shadow duration-150">
      <FavoriteButton
        isFavorite={favorites && favorites.includes(id)}
        addToFavoritesHandler={addToFavoritesHandler}
      />
      <Link to={`/details/${id}`}>
        <img
          src={listing.imgUrls[0]}
          alt="house photo"
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
        />
        <span className="absolute top-2 left-2 bg-green-800 text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg">
          {daysFromToday} days ago
        </span>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px]  truncate">{listing.address}</p>
          </div>
          <p className="font-semibold mt-2 text-lg truncate">{listing.name}</p>
          <p>
            {formatPrice(listing.regularPrice)}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
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
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
