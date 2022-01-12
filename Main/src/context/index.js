import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import refetchSlice from "./refetchSlice";

const store = configureStore({
  reducer: { account: accountSlice.reducer, refetch: refetchSlice.reducer },
});

export default store;
