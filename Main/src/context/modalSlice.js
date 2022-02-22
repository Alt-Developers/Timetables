import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isOpen: false,
  header: "",
  text: "",
  type: { type: "NONE" },
};
const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.header = action.payload.header;
      if (action.payload.text) state.text = action.payload.text;
      if (action.payload.type) state.type = action.payload.type;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = { type: "NONE" };
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
