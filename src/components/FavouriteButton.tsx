import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { motion } from "framer-motion";
import { FavoriteButtonProps } from "../types";
export const FavoriteButton = ({ isFavorite, addToFavoritesHandler }: FavoriteButtonProps) => {
  const favoriteVariants = {
    initial: { opacity: 1, scale: 1 },
    animate: { scale: [1, 1.5, 1], transition: { duration: 0.5 } },
  };
  return (
    <button onClick={addToFavoritesHandler} className="absolute right-2 top-2 z-10">
      <motion.div
        className="relative z-20"
        variants={favoriteVariants}
        initial={isFavorite ? "animate" : "initial"}
        animate={isFavorite ? "animate" : "initial"}
        exit="initial"
        transition={{ duration: 0.5 }}
      >
        {isFavorite ? (
          <MdOutlineFavorite size={24} className="text-red-600" />
        ) : (
          <MdOutlineFavoriteBorder size={24} />
        )}
      </motion.div>
    </button>
  );
};
