import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serverStatusInterface } from "../models/stateTypes";

interface statusPayload {
  status: "maintenance" | "online" | "offline";
}

interface configPayload {
  dateTime?: string;
  showCovid?: string;
  language?: string;
}

const initialState: serverStatusInterface = {
  status: "online",
};

const serverStatusSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<statusPayload>) {
      state.status = action.payload.status;
    },
  },
});

export const serverStatusAction = serverStatusSlice.actions;
export default serverStatusSlice;
