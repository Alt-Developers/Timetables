import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import refetchSlice from "./refetchSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    refetch: refetchSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
