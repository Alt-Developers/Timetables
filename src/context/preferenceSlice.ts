import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const preferenceSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    togglePreference(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const preferenceActions = preferenceSlice.actions;
export default preferenceSlice;
