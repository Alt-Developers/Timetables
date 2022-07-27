import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
  header: string;
  text: string;
  type: {
    code: string;
  };
}

interface openModalPayload {
  header: string;
  text: string;
  type?: {
    code: string;
  };
}

const initialState: modalState = {
  isOpen: false,
  header: "",
  text: "",
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

      if (action.payload.type) {
        state.type = action.payload.type;
      }
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = { code: "NONE" };
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
