import { createSlice } from "@reduxjs/toolkit";
import { timetableState } from "../models/stateTypes";

const initialState: timetableState = {
  format: {},
  classInfo: {},
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    initFormat(state, action) {
      state.format = action.payload;
    },
    initClassInfo(state, action) {
      console.log(action.payload);
      state.classInfo = action.payload;
    },
  },
});

export const timetableActions = timetableSlice.actions;
export default timetableSlice;
