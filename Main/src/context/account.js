import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = { isLoggedIn: false, userInfo: {} };
const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    // LATER
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice.reducer;
