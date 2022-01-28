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
import Loading from "./components/Loading";
import SimpleModal from "./lib/simpleModal";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const refetch = useSelector(state => state.refetch.refetchCount);
  const language = useSelector(state => state.account.language);
  const userInfo = useSelector(state => state.account.userInfo);
  const [isOpen, setIsOpen] = useState(false);

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
      `https://apis.ssdevelopers.xyz/timetables/getCode?language=${language}`
    )
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
            dispatch(accountActions.setLanguage(data.config.language));
            dispatch(
              accountActions.setConfig({
                dateTime: data.config.dateTime,
                showCovid: data.config.showCovid,
              })
            );
          }
        });
  }, [dispatch, refetch, language]);

  return (
    <SimpleModal
      isOpen={isOpen}
      header={"Something"}
      text={"Aaaaaaa "}
      // image={
      //   "https://st4.depositphotos.com/6900204/27450/v/1600/depositphotos_274505508-stock-illustration-continuous-cooperation-and-partnership-cartoon.jpg"
      // }
      backgroundColor={"#FF5252"}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/migrate" element={<Migrate />} />
          <Route
            path="/preferences"
            element={<>{userInfo.config ? <AddTimetables /> : <Loading />}</>}
          />
          <Route path="/token/:token" element={<TokenRedirect />} />
          <Route path="/timetable" element={<Timetable />} />
        </Routes>
        <Footer />
      </motion.div>
    </SimpleModal>
  );
}

export default App;
