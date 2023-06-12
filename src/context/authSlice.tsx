import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      console.log("User logged in. User:", state.user);
    },
    Logout(state) {
      state.user = null;
      console.log("User logged out. User:", state.user);
    },
  },
});

export const { Login, Logout } = authSlice.actions;

// export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
