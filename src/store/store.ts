import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import { AuthState } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export interface RootState {
  auth: AuthState;
}
export type AppDispatch = typeof store.dispatch;

export default store;
