import { useSelector } from "react-redux";
import { useSelect } from "react-select-search";
import TimetableItem from "../components/TimetableItem";
import { motion } from "framer-motion";

const Landing = props => {
  const language = navigator.locale;
  console.log(language);

  return (
    <section className="landing">
      <div className="landing__header">
        <div>
          <h1>
            Timetables with <br />
            Superpowers
          </h1>
          <h3>Timetables v2 is here</h3>
        </div>
        <div className="landing__button">
          <a href="https://authentication.ssdevelopers.xyz/login/timetables">
            <button className="landing__a">Login</button>
          </a>
          <a href="https://authentication.ssdevelopers.xyz/signup/timetables">
            <button className="landing__a">Signup</button>
          </a>
        </div>
      </div>

      <div className="landing__art">
        <motion.div
          className="landing__row"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, type: "ease" }}>
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bar__item bsmall landing__item"
            style={{ backgroundColor: "#69ACEA" }}>
            <h3>
              Current Period:
              <br />
              Science
            </h3>
            <a href="#">
              <button className="btn bar__item--btn noHover">
                View in timetable
              </button>
            </a>
            <img
              src={`./icons/SCI.png`}
              className="bar__icon"
              alt="Science Icon"
              height="120"
            />
          </div>

          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bar__item bsmall landing__item"
            style={{ backgroundColor: "#70F094" }}>
            <h3>
              Next Period:
              <br />
              Maths
            </h3>
            <a href="#">
              <button className="btn bar__item--btn noHover">
                View in timetable
              </button>
            </a>
            <img
              src={`./icons/MAT.png`}
              className="bar__icon"
              alt="Science Icon"
              height="120"
            />
          </div>
        </motion.div>
        <motion.div
          className="landing__row2"
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, type: "ease" }}>
          <div
            className={`timetable__item noHover`}
            style={{ backgroundColor: "#F95E5E" }}>
            <h3>My Class</h3>
            <h4>M 2/6</h4>
          </div>
          <div
            className={`timetable__item noHover`}
            style={{ backgroundColor: "#FF8A00" }}>
            <h3>EP 2/3</h3>
          </div>
          <div
            className={`timetable__item noHover`}
            style={{ backgroundColor: "#CC00FF" }}>
            <h3>M 2/2</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
