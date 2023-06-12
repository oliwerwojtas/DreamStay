import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Logout } from "../store/authSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    navigate("/login");

    try {
      await getAuth().signOut();

      dispatch(Logout());
    } catch (err) {
      console.log(err);
    }
  };

  return { logout };
};
