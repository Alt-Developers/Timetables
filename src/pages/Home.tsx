import Activity from "../components/Activity";
import Header from "../components/Header";

import { useEffect, useState } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Alt Timetables";
  }, []);

  return (
    <section className="home">
      <Header />
      <div className="home__content">
        <button
          onClick={() =>
            document.documentElement.style.setProperty("--accent", "#0e3178")
          }
        >
          Change Accent Color
        </button>
        <h3 className="activity__header">Activity Board</h3>
        <Activity />
      </div>
    </section>
  );
};

export default Home;
