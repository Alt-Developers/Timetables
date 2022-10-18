import "./sass/main.css";

import Home from "./pages/Home";
import Landing from "./pages/Landing";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toasterStyle = {
    minWidth: "20rem",
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    fontWeight: "700",
    boxShadow: "0 0 3rem #00000005",
    padding: "2rem",
    gap: "2rem",
    backgroundColor: "var(--light-2)",
  };

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("darkMode") as string
      );
    } else {
      console.log("no dark mode");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("darkMode", "light");
    }
  });

  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      )}
      {/* <Toaster toastOptions={{ style: toasterStyle }} position={"top-center"} /> */}
    </>
  );
}

export default App;
