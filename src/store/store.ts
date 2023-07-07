import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoritesReducer from "./favoritesSlice";
import { FavoritesState } from "./favoritesSlice";
import { AuthState } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export interface RootState {
  auth: AuthState;
  favorites: FavoritesState;
}
export type AppDispatch = typeof store.dispatch;

export default store;
