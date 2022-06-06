import "./sass/main.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import TokenRedirect from "./components/TokenRedirect";
import Preferences from "./pages/Preferences";
import Loading from "./components/Loading";
import SimpleModal from "./lib/SimpleModal/SimpleModal";
import Landing from "./pages/Landing";
import React from "react";
import axios from "axios";
import Setup from "./pages/Setup";
import Documentation from "./pages/Documentation";
import DeveloperPanel from "./pages/DeveloperPanel";
import ServerStatus from "./components/ServerStatus";

import { Route, Routes, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import { accountActions } from "./context/accountSlice";
import { timetableActions } from "./context/timetableSlice";
import { RootState } from "./context";
import { EmptyTimetable } from "./components/Empty";
import { serverStatusAction } from "./context/serverStatusSlice";

function App() {
  const Timetable = React.lazy(() => import("./pages/Timetable"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const refetch = useSelector((state: RootState) => state.refetch.refetchCount);
  const language = useSelector((state: RootState) => state.account.language);
  const userInfo = useSelector((state: RootState) => state.account);
  const serverStatus = useSelector(
    (state: RootState) => state.serverStatus.status
  );
  const [getUserIsLoading, setGetUserIsLoading] = useState(true);
  const [getMyClassIsLoading, setGetMyClassIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://status.apis.ssdevelopers.xyz/getStatus")
      .then(({ data }) => {
        if (serverStatus !== "override") {
          dispatch(serverStatusAction.setStatus({ status: data.status }));
        }
      });
    fetch("https://static.easysunday.com/covid-19/getTodayCases.json")
      .then((data) => data.json())
      .then((data) => {
        dispatch(accountActions.covid(data));
      });

    fetch("https://disease.sh/v3/covid-19/all")
      .then((data) => data.json())
      .then((data) => dispatch(accountActions.covidWorldwide(data)));

    fetch(
      `https://apis.ssdevelopers.xyz/timetables/getFormat?language=${language}`
    )
      .then((data) => data.json())
      .then((data) => {
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
        // console.log(data);
        dispatch(timetableActions.initClassInfo(data));
        setGetMyClassIsLoading(false);
      });

    console.log(location.pathname);
    if (!token && !location.pathname.startsWith("/timetable")) navigate("/");
    if (token)
      fetch("https://apis.ssdevelopers.xyz/auth/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((data) => {
          if (data.status === 404) {
            localStorage.removeItem("token");
            navigate("/");
          }
          return data.json();
        })
        .then((data) => {
          if (data.error) {
            navigate("/");
          } else {
            console.log(data);
            dispatch(accountActions.login(data));
            dispatch(accountActions.setLanguage(data.config.language));
            setGetUserIsLoading(false);
          }
        });
  }, [dispatch, refetch, language]);

  if (!localStorage.getItem("token")) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/token" element={<TokenRedirect />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route
            path="/timetable/:timetableId"
            element={
              <Suspense fallback={<EmptyTimetable />}>
                <Timetable preview={true} />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </>
    );
  } else if (
    (getUserIsLoading && getMyClassIsLoading) ||
    serverStatus === "offline"
  ) {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={
              serverStatus === "maintenance" || serverStatus === "offline" ? (
                <ServerStatus status={serverStatus} />
              ) : (
                <Loading />
              )
            }
          />
          <Route path="/token" element={<TokenRedirect />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="*" element={<Loading />} />
        </Routes>
        <Footer />
      </>
    );
  } else {
    return (
      <SimpleModal>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Routes>
            {serverStatus === "maintenance" ? (
              <Route
                path="*"
                element={<ServerStatus status={serverStatus} />}
              />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/token" element={<TokenRedirect />} />
                <Route path="/serverStatus" element={<ServerStatus />} />
              </>
            )}

            {userInfo.userInfo.type === "developer" && (
              <Route path="/developers/*" element={<DeveloperPanel />} />
            )}
            <Route
              path="/preferences"
              element={userInfo.userInfo.config ? <Preferences /> : <Loading />}
            />
            <Route
              path="/timetable/:timetableId"
              element={
                <Suspense fallback={<EmptyTimetable />}>
                  <Timetable preview={false} />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </motion.div>
      </SimpleModal>
    );
  }
}

export default App;
