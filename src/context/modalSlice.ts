import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalState } from "../models/stateTypes";

interface openModalPayload {
  header: string;
  text: string;
  centeredModal?: boolean;
  type?: {
    code: string;
  };
}

const initialState: modalState = {
  isOpen: false,
  header: "",
  text: "",
  centeredModal: false,
  type: { code: "NONE" },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<openModalPayload>) {
      state.isOpen = true;
      state.header = action.payload.header;
      state.text = action.payload.text;

      if (action.payload.centeredModal) {
        state.centeredModal = action.payload.centeredModal;
      }

      if (action.payload.type) {
        state.type = action.payload.type;
      }
    },
    closeModal(state) {
      state.isOpen = false;
      state.centeredModal = false;
      state.type = { code: "NONE" };
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
