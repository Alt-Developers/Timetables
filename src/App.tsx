import "./sass/main.css";
import Landing from "./pages/Landing";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      {isLoggedIn ? (
        <Routes>
          {" "}
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
