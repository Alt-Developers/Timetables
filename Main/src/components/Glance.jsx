import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "./TimetableFormat";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import GlanceItem from "./GlanceItem";

const Glance = props => {
  const [hour, setHour] = useState(new Date().getHours());
  const userInfo = useSelector(state => state.account.userInfo);

  useEffect(() => {
    setInterval(() => {
      const hour = new Date().getHours();
      setHour(hour);
      console.log("Refreshed Hour");
    }, [1800000]); // Half an hour
  }, []);

  const DUMMY_CURPERIOD = {
    name: "GUI",
    program: "CHEN",
  };
  const DUMMY_NEXTPERIOD = {
    name: "HIS",
    program: "CHEN",
  };

  const currentPeriod = {
    name: format[DUMMY_CURPERIOD.program][DUMMY_CURPERIOD.name].name,
    icon: format[DUMMY_CURPERIOD.program][DUMMY_CURPERIOD.name].icon,
  };
  const nextPeriod = {
    name: format[DUMMY_NEXTPERIOD.program][DUMMY_NEXTPERIOD.name].name,
    icon: format[DUMMY_NEXTPERIOD.program][DUMMY_NEXTPERIOD.name].icon,
  };
  if (userInfo.primaryClass) {
    return (
      <>
        <h3 className="bar__header">At a glance</h3>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bar">
          {hour > 7 && hour < 15 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bar__item bsmall"
                style={{ backgroundColor: "#69ACEA" }}>
                <h3>
                  Current Period: <br />
                  {currentPeriod.name}
                </h3>
                <Link
                  to={`/timetable?class=${userInfo.primaryClass.classNo}&program=${userInfo.primaryClass.program}}`}>
                  <button className="btn bar__item--btn">
                    View in timetable
                  </button>
                </Link>
                <img
                  src={`./icons/${currentPeriod.icon}.png`}
                  className="bar__icon"
                  alt="Science Icon"
                  height="150"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bar__item blarge"
                style={{ backgroundColor: "#70F094" }}>
                <h3>
                  Next Period: <br />
                  {nextPeriod.name}
                </h3>
                <p>Starting in 7 minutes</p>
                <Link
                  to={`/timetable?class=${userInfo.primaryClass.classNo}&program=${userInfo.primaryClass.program}}`}>
                  <button className="btn bar__item--btn">
                    View in timetable
                  </button>
                </Link>
                <img
                  src={`./icons/${nextPeriod.icon}.png`}
                  className="bar__icon"
                  alt="Science Icon"
                  height="150"
                />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bar__item bsmall"
                style={{ backgroundColor: "#fa9e1e" }}>
                <h3>You finished the day</h3>
                <p>Well done!</p>
                <button
                  className="btn bar__item--btn"
                  onClick={() => {
                    setHour(10);
                  }}>
                  DEBUG: SET TIME TO 10AM
                </button>
                <img
                  src={`./icons/desk.png`}
                  className="bar__icon"
                  alt="Science Icon"
                  height="150"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="bar__item blarge"
                style={{ backgroundColor: "#755cf7" }}>
                <h3>
                  What books do I <br />
                  need to bring tomorrow?
                </h3>
                <p>Maybe this timetable could help</p>
                <Link
                  to={`/timetable?class=${userInfo.primaryClass.classNo}&program=${userInfo.primaryClass.program}}`}>
                  <button className="btn bar__item--btn">View timetable</button>
                </Link>
                <img
                  src={`./icons/briefcase.png`}
                  className="bar__icon"
                  alt="Science Icon"
                  height="150"
                />
              </motion.div>
            </>
          )}
        </motion.section>
      </>
    );
  } else {
    return (
      <>
        <h3 className="bar__header">At a glance</h3>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bar">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bar__item"
            style={{ animation: "bgColor 5s infinite linear", width: "100%" }}>
            <h3>Welcome to Timetables!</h3>
            <p>Add your primary class to see "At a glance"</p>
            <Link className="btn bar__item--btn" to="/preferences">
              Add primary class
            </Link>
            <img
              src={`./icons/welcome.png`}
              className="bar__icon"
              alt="Science Icon"
              height="150"
            />
          </motion.div>
        </motion.section>
      </>
    );
  }
};

export default Glance;
