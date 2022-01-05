import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./account";

const store = configureStore({
  reducer: { account: accountSlice },
});

export default store;
