import "./sass/main.css";

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { accountActions } from "./context/accountSlice";
import TokenRedirect from "./components/TokenRedirect";
import Migrate from "./pages/Migrate";
import AddTimetables from "./pages/AddTimetables";
import Timetable from "./pages/Timetable";
import openSocket from "socket.io-client";

function App() {
  const dispatch = useDispatch();
  const refetch = useSelector(state => state.refetch.refetchCount);

  // useEffect(() => {
  //   const socket = openSocket("https://apis.ssdevelopers.xyz");
  //   // socket.on("connect_error", () => {
  //   //   console.log("failed");
  //   // });
  //   // socket.on("glance", data => {});
  // }, []);

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

    fetch("https://apis.ssdevelopers.xyz/timetables/getCode")
      .then(data => data.json())
      .then(data => dispatch(accountActions.initFormat(data.codes)));

    if (!token)
      window.location.href =
        "https://authentication.ssdevelopers.xyz/login/timetables";
    if (token)
      fetch("https://apis.ssdevelopers.xyz/timetables/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(data => data.json())
        .then(data => {
          if (data.error) {
            window.location.href =
              "https://authentication.ssdevelopers.xyz/login/timetables";
          } else {
            dispatch(accountActions.login(data));
          }
        });
  }, [dispatch, refetch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/migrate" element={<Migrate />} />
        <Route path="/preferences" element={<AddTimetables />} />
        <Route path="/token/:token" element={<TokenRedirect />} />
        <Route path="/timetable" element={<Timetable />} />
      </Routes>
      <Footer />
    </motion.div>
  );
}

export default App;
