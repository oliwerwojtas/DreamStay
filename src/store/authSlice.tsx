import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface AuthState {
  loggedIn: boolean;
  googleLoggedIn: boolean;
  checkingStatus: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
  googleLoggedIn: false,
  checkingStatus: true,
};

export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async () => {
  const auth = getAuth();
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state, action: PayloadAction<string>) {
      state.loggedIn = true;
      state.googleLoggedIn = true;
      console.log("User login:", state);
    },
    Logout(state) {
      state.loggedIn = false;
      state.googleLoggedIn = false;
      console.log("User logout:", state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.checkingStatus = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.checkingStatus = false;
        state.loggedIn = action.payload !== null;
        state.googleLoggedIn = action.payload !== null;
      });
  },
});

export const { Login, Logout } = authSlice.actions;

export default authSlice.reducer;
