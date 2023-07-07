import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoritesState {
  favorites: string[];
}

const favoritesFromStorage = localStorage.getItem("favoritesItems");
const favorites = favoritesFromStorage !== null ? JSON.parse(favoritesFromStorage) : [];
const initialState: FavoritesState = {
  favorites: favorites,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string[]>) => {
      const existingFavorites = state.favorites;
      const newFavorites = action.payload.filter((id) => !existingFavorites.includes(id));
      state.favorites.push(...newFavorites);
    },
    removeFromFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = state.favorites.filter((id) => !action.payload.includes(id));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
