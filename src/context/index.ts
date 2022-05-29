import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import refetchSlice from "./refetchSlice";
import modalSlice from "./modalSlice";
import timetableSlice from "./timetableSlice";
import serverStatusSlice from "./serverStatusSlice";

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    refetch: refetchSlice.reducer,
    modal: modalSlice.reducer,
    timetable: timetableSlice.reducer,
    serverStatus: serverStatusSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
