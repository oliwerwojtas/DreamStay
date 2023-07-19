import { NavLink } from "react-router-dom";
import { MouseEvent } from "react";
import icon from "../assets/favicon-32x32.png";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";
import { RootState } from "../types";
import { useSelector } from "react-redux";
import { MdOutlineFavorite } from "react-icons/md";
import { toast } from "react-toastify";
import { Button } from "./shared/Button";

export const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const { loggedIn, googleLoggedIn, githubLoggedIn, initialStatusChecked } = useAuth();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const favorites = useSelector((state: RootState) => state.favorites.favoritesItems);

  useEffect(() => {
    if (auth.currentUser?.uid) {
      const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);

      getDoc(userFavoritesRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const favoritesData = docSnapshot.data();
            const favoritesCount = favoritesData.favorites.length;
            setFavoritesCount(favoritesCount);
          } else {
            setFavoritesCount(favorites.length);
          }
        })
        .catch((error) => {
          console.error("Error getting user favorites:", error);
        });
    }
  }, [auth.currentUser, favorites.length, favorites]);

  const handleOpenFavourites = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    toast.error("Not ready yet! :)");
  };
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-30">
      <header className="flex justify-between items-center px-3 py-3 max-w-6xl mx-auto">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={icon} alt="app icon" className="h-10" />
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
                    <p className="flex justify-center items-center" onClick={handleOpenFavourites}>
                      <MdOutlineFavorite size={24} className="text-red-600" />
                      <span className="font-medium text-lg">({favoritesCount})</span>
                    </p>

                    <Dropdown />
                  </>
                ) : (
                  <>
                    <Button className="px-5 rounded-md ">
                      <NavLink to="/login" className="font-medium text-[#22292f]">
                        Login
                      </NavLink>
                    </Button>
                    <Button className="px-5 rounded-md ">
                      <NavLink to="/signup" className="font-medium text-[#22292f]">
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
    </div>
  );
};
