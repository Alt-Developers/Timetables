import { configureStore } from "@reduxjs/toolkit";
import preferencesSlice from "./preferenceSlice";

export const store = configureStore({
  reducer: {
    preference: preferencesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
