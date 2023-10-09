import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchUserListings } from "../hooks/useFetchUserListings";
//components
import { ListingItem } from "./ListingItem";
import { FavoritesModalProps } from "../types/components/components";
import { Button } from "./shared/Button";
//utilities
import { RootState } from "../types/auth/auth";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import { AiOutlineClose } from "react-icons/ai";
import { db } from "../config";
import { collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { modalHeartVariants } from "../utilities/animations";

export const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { listings } = useFetchUserListings();
  const auth = getAuth();
  const favoritesRedux = useSelector((state: RootState) => state.favorites.favoritesItems);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          setFavorites(favoritesData.favorites);
        } else {
          setFavorites([]);
        }
        setIsLoading(false);
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(`${errorMessage}`);
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
        variants={modalHeartVariants}
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
              {favorites.length <= 0 ? (
                <p className="text-center">No favorites!</p>
              ) : (
                favorites.map((favoriteId, index) => {
                  const listingData = listings.find((listing) => listing.id === favoriteId)?.data;

                  if (listingData)
                    return (
                      <li key={index}>
                        <ListingItem id={favoriteId} listing={listingData} isModalOpen={true} />
                      </li>
                    );
                })
              )}
            </ul>
          </>
        )}
      </motion.div>
    </div>
  );
};
