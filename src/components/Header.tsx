import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//components
import { Dropdown } from "./Dropdown";
import { Button } from "./shared/Button";
import { FavoritesModal } from "./FavouritesModal";
//utilities
import { NavLink } from "react-router-dom";
import { MouseEvent } from "react";

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";
import { RootState } from "../types/auth/auth";
import { MdOutlineFavorite } from "react-icons/md";
import { toast } from "react-toastify";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BsFillHouseDoorFill } from "react-icons/bs";

export const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { loggedIn, googleLoggedIn, githubLoggedIn, initialStatusChecked } = useAuth();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const favoritesRedux = useSelector((state: RootState) => state.favorites.favoritesItems);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser?.uid) {
          const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);
          const docSnapshot = await getDoc(userFavoritesRef);

          if (docSnapshot.exists()) {
            const favoritesData = docSnapshot.data();
            const favoritesCount = favoritesData.favorites.length;
            setFavoritesCount(favoritesCount);
          } else {
            setFavoritesCount(favoritesRedux.length);
          }
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(`${errorMessage}`);
      }
    };

    fetchData();
  }, [auth.currentUser, favoritesRedux.length, favoritesRedux]);

  const handleCloseFavourites = () => {
    setShowFavoritesModal(false);
  };
  const handleOpenFavourites = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    setShowFavoritesModal(true);
  };
  return (
    <>
      <motion.div
        className="bg-white border-b shadow-sm sticky top-0 z-30"
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        animate={hidden ? "hidden" : "visible"}
      >
        <header className="flex justify-between items-center px-3 py-3 max-w-6xl mx-auto">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <span className="bg-[#ffcb74] rounded-full w-10 h-10 flex justify-center items-center">
              <BsFillHouseDoorFill size={24} />
            </span>

            <div>
              <span className="ml-2 text-[#22292f]  font-medium text-lg">Dream</span>
              <span className="font-medium text-xl text-[#22292f]">Stay</span>
            </div>
          </div>

          <div>
            <ul className="flex space-x-2">
              {initialStatusChecked && (
                <>
                  {loggedIn || googleLoggedIn || githubLoggedIn ? (
                    <>
                      <p
                        className="flex justify-center items-center"
                        onClick={handleOpenFavourites}
                        data-cy="favouriteCounter"
                      >
                        <MdOutlineFavorite size={24} className="text-red-600 cursor-pointer" />
                        <span className="font-medium text-lg">({favoritesCount})</span>
                      </p>

                      <Dropdown />
                    </>
                  ) : (
                    <>
                      <Button className="px-0 py-0 rounded-md">
                        <NavLink
                          to="/login"
                          className="font-medium text-[#22292f] px-2"
                          data-cy="loginButton"
                        >
                          Login
                        </NavLink>
                      </Button>
                      <Button className="px-0 py-0 rounded-md">
                        <NavLink
                          to="/signup"
                          className="font-medium text-[#22292f] px-2"
                          data-cy="signupButton"
                        >
                          Sign Up
                        </NavLink>
                      </Button>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
        </header>
      </motion.div>
      {showFavoritesModal && <FavoritesModal onClose={handleCloseFavourites} />}
    </>
  );
};
