import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accountState } from "../models/stateTypes";

interface loginPayload {
  color: string;
  email: string;
  type: "developer" | "user";
  firstName: string;
  lastName: string;
  profilePicture: string;
  config: {
    dateTime: string;
    showCovid: string;
    language: string;
    tmrPref: string;
  };
}

interface configPayload {
  dateTime?: string;
  showCovid?: string;
  language?: string;
}

const initialState: accountState = {
  isAuthenticated: false,
  userInfo: {},
  covid: { isFetched: false },
  covidWorldwide: { isFetched: false },
  language: "EN",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action: PayloadAction<loginPayload>) {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userInfo = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      window.location.href = "https://timetables.ssdevelopers.xyz/landing";
      // window.location.href = "http://localhost:3000/landing";
    },
    covid(state, action: PayloadAction<any>) {
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
        isFetched: true,
        newCases: action.payload.NewConfirmed,
        newDeaths: action.payload.NewDeaths,
        country: action.payload.country,
        lastUpdated,
      };
      // console.log(state.covid);
    },
    covidWorldwide(state, action: PayloadAction<any>) {
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
        isFetched: true,
        newCases: action.payload.todayCases,
        lastUpdated,
      };
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const accountActions = accountSlice.actions;
export default accountSlice;
