import Clock from "../components/Clock";
import Timeline from "../components/Timeline";
import Preferences from "../components/Preferences";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { preferenceActions } from "../context/preferenceSlice";

const Home = () => {
  const [dateTime, setDateTime] = useState("24h");
  const dispatch = useDispatch();

  return (
    <>
      <Preferences />
      <header className="header">
        <h1>
          It's currently
          <br />
          {
            <Clock
              options={{
                hour: "numeric",
                minute: "numeric",
                hourCycle: dateTime === "12h" ? "h12" : "h23",
              }}
            />
          }{" "}
          {dateTime === "12h" ? "" : "O'Clock"}
        </h1>
        <div className="header__options">
          <div onClick={() => dispatch(preferenceActions.togglePreference())}>
            <i className="bx bx-cog"></i>
          </div>
          <img
            src="https://pbs.twimg.com/profile_images/1509787105425526787/WdSeMffL_400x400.jpg"
            alt=""
          />
        </div>
      </header>
      <main className="main__home">
        <h3 className="text-header">Timeline</h3>
        <Timeline />
      </main>
    </>
  );
};

export default Home;
