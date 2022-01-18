import { createSlice } from "@reduxjs/toolkit";

const initialrefetchState = {
  refetchCount: 0,
  refetchTimetableCount: 0,
};
const refetchSlice = createSlice({
  name: "refetch",
  initialState: initialrefetchState,
  reducers: {
    refetch(state, action) {
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
