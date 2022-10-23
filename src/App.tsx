import "./sass/main.css";

import Home from "./pages/Home";
import Landing from "./pages/Landing";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Timetable from "./pages/Timetable";
import Preferences from "./pages/Preferences";

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
    <section className="app">
      <div style={{ minHeight: "calc(100vh - 6rem)" }}>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/timetable/:timetableId" element={<Timetable />} />
            <Route
              path="/preferences/:preferencePane"
              element={<Preferences />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
        {/* <Toaster
          toastOptions={{ style: toasterStyle }}
          position={"top-center"}
        /> */}
      </div>
      <Footer />
    </section>
  );
}

export default App;
