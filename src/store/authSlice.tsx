import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth/auth";

const initialState: AuthState = {
  loggedIn: false,
  googleLoggedIn: false,
  githubLoggedIn: false,
  checkingStatus: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state, action: PayloadAction<string>) {
      state.loggedIn = true;
      state.googleLoggedIn = true;
      state.githubLoggedIn = true;
    },
    Logout(state) {
      state.loggedIn = false;
      state.googleLoggedIn = false;
      state.githubLoggedIn = false;
    },
  },
});

export const { Login, Logout } = authSlice.actions;

export default authSlice.reducer;
