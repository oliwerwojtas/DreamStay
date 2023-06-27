import { NavLink } from "react-router-dom";
import icon from "../assets/favicon.ico";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, googleLoggedIn, githubLoggedIn, initialStatusChecked } = useAuth();
  return (
    <div className="bg-white border-b shadow-sm">
      <header className="flex justify-between items-center px-3 py-3 max-w-6xl mx-auto">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={icon} alt="app icon" className="h-8" />
          <div>
            <span className="ml-2 text-green-500">Dream</span>
            <span>Stay</span>
          </div>
        </div>
        <div>
          <ul className="flex space-x-10">
            {initialStatusChecked && (
              <>
                {loggedIn || googleLoggedIn || githubLoggedIn ? (
                  <>
                    <NavLink to="/" className="relative group ">
                      Home
                      <div className="absolute w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform "></div>
                    </NavLink>

                    <NavLink to="/settings" className="relative group">
                      Settings
                      <div className="absolute w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform "></div>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="relative group">
                      Login
                      <div className="absolute w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform "></div>
                    </NavLink>
                    <NavLink to="/signup" className="relative group">
                      Sign Up
                      <div className="absolute w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform "></div>
                    </NavLink>
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
