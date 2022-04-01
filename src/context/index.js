import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import refetchSlice from "./refetchSlice";
import modalSlice from "./modalSlice";
import timetableSlice from "./timetableSlice";

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    refetch: refetchSlice.reducer,
    modal: modalSlice.reducer,
    timetable: timetableSlice.reducer,
  },
});

export default store;
