import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = { isAuthenticated: false, userInfo: {} };
const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice;
