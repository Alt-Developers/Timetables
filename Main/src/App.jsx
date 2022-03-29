import "./sass/main.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import TokenRedirect from "./components/TokenRedirect";
import Migrate from "./pages/Migrate";
import Preferences from "./pages/Preferences";
import Loading from "./components/Loading";
import SimpleModal from "./lib/simpleModal";
import Landing from "./pages/Landing";
import React from "react";
import axios from "axios";

import { Route, Routes, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { accountActions } from "./context/accountSlice";
import { timetableActions } from "./context/timetableSlice";

function App() {
  const Timetable = React.lazy(() => import("./pages/Timetable"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refetch = useSelector(state => state.refetch.refetchCount);
  const language = useSelector(state => state.account.language);
  const userInfo = useSelector(state => state.account);
  const modalState = useSelector(state => state.modal);
  const [getUserIsLoading, setGetUserIsLoading] = useState(true);
  const [getMyClassIsLoading, setGetMyClassIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://static.easysunday.com/covid-19/getTodayCases.json")
      .then(data => data.json())
      .then(data => {
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
        dispatch(timetableActions.initClassInfo(data));
        console.log("a");
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
            dispatch(accountActions.login(data));
            dispatch(accountActions.setLanguage(data.config.language));
            dispatch(
              accountActions.setConfig({
                dateTime: data.config.dateTime,
                showCovid: data.config.showCovid,
              })
            );
            console.log("b");
            setGetUserIsLoading(false);
          }
        });
  }, [dispatch, refetch, language]);

  if (getMyClassIsLoading && getUserIsLoading) {
    return <Loading />;
  } else {
    return (
      <SimpleModal
        isOpen={modalState.isOpen}
        header={modalState.header}
        text={modalState.text}
        type={modalState.type}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/migrate" element={<Migrate />} />
            <Route
              path="/preferences"
              element={<>{userInfo.config ? <Preferences /> : <Loading />}</>}
            />
            <Route path="/token/:token" element={<TokenRedirect />} />
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
