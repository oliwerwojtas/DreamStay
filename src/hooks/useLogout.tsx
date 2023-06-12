import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../context/authSlice";
// import { RootState } from "../context/store";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const user = useSelector((state: RootState) => state.auth.user);

  const logout = async () => {
    navigate("/login");

    try {
      await getAuth().signOut();

      dispatch(Logout());
      //   console.log("User:", user);
    } catch (err) {
      console.log(err);
    }
  };

  return { logout };
};
