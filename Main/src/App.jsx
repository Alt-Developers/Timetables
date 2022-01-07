import "./sass/main.css";

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { accountActions } from "./context/accountSlice";
import TokenRedirect from "./components/TokenRedirect";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token)
      window.location.href = "http://localhost:3000/login/:timetables";

    if (token)
      fetch("https://apis.ssdevelopers.xyz/timetables/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(data => data.json())
        .then(data => dispatch(accountActions.login(data)))
        .catch(err => {
          console.log("OASIDHIJSFHKLJHX");
        });
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/token/:token" element={<TokenRedirect />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
