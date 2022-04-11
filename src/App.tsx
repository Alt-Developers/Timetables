import "./sass/main.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import TokenRedirect from "./components/TokenRedirect";
import Migrate from "./pages/Migrate";
import Preferences from "./pages/Preferences";
import Loading from "./components/Loading";
import SimpleModal from "./lib/SimpleModal/SimpleModal";
import Landing from "./pages/Landing";
import React from "react";
import axios from "axios";
import Setup from "./pages/Setup";

import { Route, Routes, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { accountActions } from "./context/accountSlice";
import { timetableActions } from "./context/timetableSlice";
import { modalActions } from "./context/modalSlice";
import { RootState } from "./context";

function App() {
  const Timetable = React.lazy(() => import("./pages/Timetable"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refetch = useSelector((state: RootState) => state.refetch.refetchCount);
  const language = useSelector((state: RootState) => state.account.language);
  const userInfo = useSelector((state: RootState) => state.account);
  const modalState = useSelector((state: RootState) => state.modal);
  const [getUserIsLoading, setGetUserIsLoading] = useState(true);
  const [getMyClassIsLoading, setGetMyClassIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://static.easysunday.com/covid-19/getTodayCases.json")
      .then(data => data.json())
      .then(data => {
        console.log(data);
        dispatch(accountActions.covid(data));
      });

    fetch("https://disease.sh/v3/covid-19/all")
      .then(data => data.json())
      .then(data => dispatch(accountActions.covidWorldwide(data)));

    fetch(
      `https://apis.ssdevelopers.xyz/timetables/getFormat?language=${language}`
    )
      .then(data => data.json())
      .then(data => {
        dispatch(timetableActions.initFormat(data.formattedFormat));
      });

    axios
      .get("https://apis.ssdevelopers.xyz/timetables/getMyClass", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(({ data }) => {
        if (!data.primaryClass) {
          navigate(`/setup`);
        }
        console.log(data);
        dispatch(timetableActions.initClassInfo(data));
        setGetMyClassIsLoading(false);
      });

    if (!token) navigate("/landing");
    if (token)
      fetch("https://apis.ssdevelopers.xyz/auth/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(data => {
          if (data.status === 404) {
            localStorage.removeItem("token");
            navigate("/landing");
          }
          return data.json();
        })
        .then(data => {
          if (data.error) {
            navigate("/landing");
          } else {
            console.log(data);
            dispatch(accountActions.login(data));
            dispatch(accountActions.setLanguage(data.config.language));
            // dispatch(
            //   accountActions.setConfig({
            //     dateTime: data.config.dateTime,
            //     showCovid: data.config.showCovid,
            //   })
            // );
            setGetUserIsLoading(false);
          }
        });
  }, [dispatch, refetch, language]);

  if (getUserIsLoading && getMyClassIsLoading && !userInfo.isAuthenticated) {
    return (
      <>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/token" element={<TokenRedirect />} />
          <Route path="/setup" element={<Setup />} />
        </Routes>
        {location.pathname !== "/landing" && <Loading />}
        <Footer />
      </>
    );
  } else {
    return (
      <SimpleModal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/migrate" element={<Migrate />} />
            <Route path="/setup" element={<Setup />} />

            <Route
              path="/preferences"
              element={
                <>{userInfo.userInfo.config ? <Preferences /> : <Loading />}</>
              }
            />
            <Route path="/token" element={<TokenRedirect />} />
            <Route
              path="/timetable"
              element={
                <Suspense fallback={<Loading />}>
                  <Timetable />
                </Suspense>
              }
            />
          </Routes>
          <Footer />
        </motion.div>
      </SimpleModal>
    );
  }
}

export default App;