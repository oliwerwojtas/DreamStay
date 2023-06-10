import { NavLink } from "react-router-dom";
import icon from "../assets/favicon.ico";
export const Header = () => {
  return (
    <div className="bg-white border-b shadow-sm">
      <header className="flex justify-between items-center px-3 py-3 max-w-6xl mx-auto">
        <div className="flex items-center">
          <img src={icon} alt="app icon" className="h-8" />
          <div>
            <span className="ml-2 text-green-500">Dream</span>
            <span>Stay</span>
          </div>
        </div>
        <div>
          <ul className="flex space-x-10">
            <NavLink to="/" className="relative group ">
              Home
              <div className="absolute w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform "></div>
            </NavLink>
            <NavLink to="/login" className="relative group ">
              Login
              <div className="absolute w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform "></div>
            </NavLink>
            <NavLink to="/signup" className="relative group">
              Sign Up
              <div className="absolute w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform "></div>
            </NavLink>
          </ul>
        </div>
      </header>
    </div>
  );
};
