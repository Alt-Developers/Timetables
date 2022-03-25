import { createSlice } from "@reduxjs/toolkit";

const initialTimetableState = {
  format: {},
  classInfo: {},
};

const timetableSlice = createSlice({
  name: "timetable",
  initialState: initialTimetableState,
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
