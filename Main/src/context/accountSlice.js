import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  isAuthenticated: false,
  userInfo: {},
  covid: { isFetched: false },
  covidWorldwide: { isFetched: false },
  timetableContent: {},
};
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
    covid(state, action) {
      const lastUpdated = new Date(action.payload.updated).toLocaleString(
        "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
      );

      state.covid = {
        newCases: action.payload.NewConfirmed,
        newDeaths: action.payload.NewDeaths,
        country: action.payload.country,
        lastUpdated,
      };
    },
    covidWorldwide(state, action) {
      const lastUpdated = new Date(action.payload.updated).toLocaleString(
        "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
      );

      state.covidWorldwide = {
        newCases: action.payload.todayCases,
        lastUpdated,
      };
    },
    initializeTimetable(state, action) {
      state.timetableContent = action.payload;
    },
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice;
