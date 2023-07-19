import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoritesState } from "../types";
const initialState: FavoritesState = {
  favoritesItems: [],
};
export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string[]>) => {
      const existingFavorites = state.favoritesItems;
      const newFavorites = action.payload.filter((id) => !existingFavorites.includes(id));
      state.favoritesItems.push(...newFavorites);
    },
    removeFromFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoritesItems = state.favoritesItems.filter((id) => !action.payload.includes(id));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
