import { FavoriteButtonProps } from "../types/components/components";
//utilities
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { motion } from "framer-motion";
import { favoriteButtonVariants } from "../utilities/animations";
import React from "react";

export const FavoriteButton = ({ isFavorite, addToFavoritesHandler }: FavoriteButtonProps) => {
  return (
    <button
      onClick={addToFavoritesHandler}
      className="bg-[#ffcb74] px-4 py-4 rounded-full w-6 h-6 flex justify-center items-center absolute right-2 top-2 z-20"
      data-cy="favouriteButton"
    >
      <motion.div
        className="relative z-20"
        variants={favoriteButtonVariants}
        initial={isFavorite ? "animate" : "initial"}
        animate={isFavorite ? "animate" : "initial"}
        exit="initial"
        transition={{ duration: 0.5 }}
      >
        {isFavorite ? (
          <MdOutlineFavorite size={22} className="text-red-600" />
        ) : (
          <MdOutlineFavoriteBorder size={22} />
        )}
      </motion.div>
    </button>
  );
};
