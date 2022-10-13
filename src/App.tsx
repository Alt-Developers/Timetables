import "./sass/main.css";
import Landing from "./pages/Landing";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
    </>
  );
}

export default App;
