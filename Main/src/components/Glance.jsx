import { useEffect, useState } from "react";

const Glance = props => {
  const scienceIcon = require("../assets/subjects/science.png");
  const mathIcon = require("../assets/subjects/math.png");
  const deskIcon = require("../assets/subjects/desk.png");
  const briefcaseIcon = require("../assets/subjects/briefcase.png");

  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    setInterval(() => {
      const hour = new Date().getHours();
      setHour(hour);
      console.log("Refreshed Hour");
    }, [1800000]); // Half an hour
  }, []);

  return (
    <>
      <h3 className="bar__header">At a glance</h3>
      <section className="bar">
        {hour > 7 && hour < 15 ? (
          <>
            <div
              className="bar__item bsmall"
              style={{ backgroundColor: "#69ACEA" }}>
              <h3>
                Current Period: <br />
                Foundation Science
              </h3>
              <p>Ending in 7 minutes</p>
              <button className="btn bar__item--btn">View in timetable</button>
              <img
                src={scienceIcon}
                className="bar__icon"
                alt="Science Icon"
                height="150"
              />
            </div>
            <div
              className="bar__item blarge"
              style={{ backgroundColor: "#70F094" }}>
              <h3>
                Next Period: <br />
                Universal Maths
              </h3>
              <p>Starting in 7 minutes</p>
              <button className="btn bar__item--btn">View in timetable</button>
              <img
                src={mathIcon}
                className="bar__icon"
                alt="Science Icon"
                height="150"
              />
            </div>
          </>
        ) : (
          <>
            <div
              className="bar__item bsmall"
              style={{ backgroundColor: "#fa9e1e" }}>
              <h3>You finished the day</h3>
              <p>Well done!</p>
              <button
                className="btn bar__item--btn"
                style={{ backgroundColor: "red" }}
                onClick={() => {
                  setHour(10);
                }}>
                DEBUG: SET TIME TO 10AM
              </button>
              <img
                src={deskIcon}
                className="bar__icon"
                alt="Science Icon"
                height="150"
              />
            </div>
            <div
              className="bar__item blarge"
              style={{ backgroundColor: "#755cf7" }}>
              <h3>
                What books do I <br />
                need to bring tomorrow?
              </h3>
              <p>Maybe this timetable could help</p>
              <button className="btn bar__item--btn">View timetable</button>
              <img
                src={briefcaseIcon}
                className="bar__icon"
                alt="Science Icon"
                height="150"
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Glance;
