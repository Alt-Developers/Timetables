import "./sass/main.css";

import { Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { accountActions } from "./context/accountSlice";
import TokenRedirect from "./components/TokenRedirect";
import Migrate from "./pages/Migrate";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) window.location.href = "http://localhost:3000/login/timetables";
    if (token)
      fetch("https://apis.ssdevelopers.xyz/timetables/getUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(data => data.json())
        .then(data => {
          if (data.error) {
            window.location.href = "http://localhost:3000/login/timetables";
          } else if (!data.primaryClass) {
            navigate("/migrate");
          } else {
            dispatch(accountActions.login(data));
          }
        });
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/migrate" element={<Migrate />} />
        <Route path="/token/:token" element={<TokenRedirect />} />
      </Routes>
      <Footer />
    </motion.div>
  );
}

export default App;
