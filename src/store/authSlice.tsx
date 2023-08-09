import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth/auth";

const initialState: AuthState = {
  loggedIn: false,
  googleLoggedIn: false,
  githubLoggedIn: false,
  emailLoggedIn: false,
  checkingStatus: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state, action: PayloadAction<string>) {
      const loginMethod = action.payload;
      switch (loginMethod) {
        case "google":
          state.googleLoggedIn = true;
          break;
        case "github":
          state.githubLoggedIn = true;
          break;
        case "email":
          state.emailLoggedIn = true;
          break;
        default:
          break;
      }
      state.loggedIn = true;
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
