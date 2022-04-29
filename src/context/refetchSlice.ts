import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { refetchState } from "../models/stateTypes";

const initialState: refetchState = {
  refetchCount: 0,
  refetchTimetableCount: 0,
};

const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    refetch(state, action: PayloadAction<string>) {
      if (action.payload === "Timetable List") {
        state.refetchTimetableCount++;
      }
      if (!action.payload) {
        state.refetchCount++;
      }
    },
  },
});

export const refetchActions = refetchSlice.actions;
export default refetchSlice;
