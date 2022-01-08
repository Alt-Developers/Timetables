import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = { isAuthenticated: false, userInfo: {} };
const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    login(state, action) {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userInfo = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      window.location.href = "http://localhost:3000/login/timetables";
    },
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice;
