import { motion } from "framer-motion";

import { ListingItem } from "./ListingItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../types";
import { useFetchUserListings } from "../hooks/useFetchUserListings";
import { FavoritesModalProps } from "../types";
import { Button } from "./shared/Button";
import { getAuth } from "firebase/auth";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";

export const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { listings } = useFetchUserListings();
  const auth = getAuth();
  const favoritesRedux = useSelector((state: RootState) => state.favorites.favoritesItems);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(listings);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesRef = collection(db, "favorites");

        const userId = auth.currentUser?.uid;

        const favoritesQuery = query(favoritesRef);

        const favoritesSnapshot = await getDocs(favoritesQuery);

        const userFavorites = favoritesSnapshot.docs.filter((doc) => doc.id === userId);

        if (userFavorites.length > 0) {
          const favoritesData = userFavorites[0].data();
          console.log("FavoritesData:", favoritesData);
          setFavorites(favoritesData.favorites);
        } else {
          setFavorites([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [auth.currentUser, favoritesRedux]);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-30">
      <motion.div
        className={` ${
          isLoading ? "" : "bg-[#f6f6f6]"
        } p-4 rounded-md shadow-lg  flex flex-col nowrap overflow-y-auto max-w-[90%] max-h-[90%]`}
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          type: "spring",
          damping: 10,
          stiffness: 150,
        }}
      >
        {isLoading ? (
          ""
        ) : (
          <>
            <div className="flex gap-2 mb-6 justify-between">
              <p className="text-center justify-center items-center flex text-[#22292f] font-semibold text-xl">
                Your favourites homes!
              </p>
              <Button
                className="block px-2 py-1 text-[#22292f] font-semibold rounded-md"
                onClick={onClose}
              >
                <AiOutlineClose size={22} />
              </Button>
            </div>
            <ul
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
              onClick={onClose}
            >
              {favorites.map((favoriteId, index) => {
                const listingData = listings.find((listing) => listing.id === favoriteId)?.data;

                if (listingData)
                  return (
                    <li key={index}>
                      <ListingItem id={favoriteId} listing={listingData} isModalOpen={true} />
                    </li>
                  );
              })}
            </ul>
          </>
        )}
      </motion.div>
    </div>
  );
};
