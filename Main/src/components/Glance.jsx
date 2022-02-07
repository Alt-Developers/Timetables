import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Glance = props => {
  const [hour, setHour] = useState(new Date().getHours());
  const userInfo = useSelector(state => state.account.userInfo);
  const format = useSelector(state => state.account.format);
  const language = useSelector(state => state.account.language);

  useEffect(() => {
    setInterval(() => {
      const hour = new Date().getHours();
      setHour(hour);
    }, [1800000]); // Half an hour
  }, []);

  console.log(userInfo.glance);

  let currentPeriod = "MAT";
  let nextPeriod = "MAT";

  if (userInfo.glance && userInfo.primaryClass) {
    currentPeriod = {
      name: format[userInfo.primaryClass.program][userInfo.glance.currentClass]
        .name,
      icon: format[userInfo.primaryClass.program][userInfo.glance.currentClass]
        .icon,
    };
    nextPeriod = {
      name: format[userInfo.primaryClass.program][userInfo.glance.nextClass]
        .name,
      icon: format[userInfo.primaryClass.program][userInfo.glance.nextClass]
        .icon,
    };
  }

  console.log(userInfo.glance);
  if (userInfo.glance.currentClass === "WKN") {
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
            className="bar__item bsmall"
            style={{ backgroundColor: "#3fd9a5" }}>
            <h3>
              {language === "EN" ? "It's the weekends!" : "วันหยุดสัปดาห์แล้ว!"}
            </h3>
            <p>
              {language === "EN"
                ? "Breaks are essential for your brain."
                : "พักผ่อนเยอะๆ นะ"}
            </p>
            <img
              src={`./icons/openBook.png`}
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
            style={{ backgroundColor: "#eb345b" }}>
            <h3>
              {language === "EN" ? "Wonder which" : "ได้เวลาเตรียมตัว"}
              <br />
              {language === "EN"
                ? "lessons are coming up?"
                : "สำหรับสัปดาห์หน้าแล้ว"}
            </h3>
            <p>
              {language === "EN"
                ? "Timetables to the rescue!"
                : "ตารางสอนอาจจะช่วยได้นะ"}
            </p>
            <Link
              to={`/timetable?class=${userInfo.primaryClass.classNo}&program=${
                userInfo.primaryClass.program
              }&color=${userInfo.color.replace("#", "")}`}>
              <button className="btn bar__item--btn">
                {language === "EN" ? "View timetable" : "ดูตารางสอน"}
              </button>
            </Link>
            <img
              src={`./icons/neural.png`}
              className="bar__icon"
              alt="Science Icon"
              height="150"
            />
          </motion.div>
        </motion.section>
      </>
    );
  } else if (userInfo.primaryClass) {
    return (
      <>
        <h3 className="bar__header">At a glance</h3>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bar">
          {hour >= 7 && hour < 15 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bar__item bsmall"
                style={{ backgroundColor: "#69ACEA" }}>
                <h3>
                  {language === "EN" ? "Current Period:" : "ตอนนี้วิชา:"}
                  <br />
                  {currentPeriod.name}
                </h3>
                <Link
                  to={`/timetable?class=${
                    userInfo.primaryClass.classNo
                  }&program=${
                    userInfo.primaryClass.program
                  }&color=${userInfo.color.replace("#", "")}`}>
                  <button className="btn bar__item--btn">
                    {language === "EN" ? "View in timetable" : "ดูในตารางสอน"}
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
                  {language === "EN" ? "Next Period:" : "วิชาต่อไป:"}
                  <br />
                  {nextPeriod.name}
                </h3>
                <Link
                  to={`/timetable?class=${
                    userInfo.primaryClass.classNo
                  }&program=${
                    userInfo.primaryClass.program
                  }&color=${userInfo.color.replace("#", "")}`}>
                  <button className="btn bar__item--btn">
                    {language === "EN" ? "View in timetable" : "ดูในตารางสอน"}
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
                <h3>
                  {language === "EN"
                    ? "You finished the day"
                    : "เรียนจบวันแล้ว"}
                </h3>
                <p>{language === "EN" ? "Well done!" : "ยินดีด้วย!"}</p>
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
                  {language === "EN" ? "What books do I" : "พรุ่งนี้ต้อง"}
                  <br />
                  {language === "EN"
                    ? "need to bring tomorrow?"
                    : "เอาหนังสืออะไรไปบ้างนะ?"}
                </h3>
                <p>
                  {language === "EN"
                    ? "Maybe this timetable could help"
                    : "ลองดูตารางสอนก่อนมั้ย?"}
                </p>
                <Link
                  to={`/timetable?class=${
                    userInfo.primaryClass.classNo
                  }&program=${
                    userInfo.primaryClass.program
                  }&color=${userInfo.color.replace("#", "")}`}>
                  <button className="btn bar__item--btn">
                    {language === "EN" ? "View in timetable" : "ดูในตารางสอน"}
                  </button>
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
            className="bar__item welcome"
            style={{ animation: "bgColor 5s infinite linear", width: "100%" }}>
            <h3>Welcome to Timetables!</h3>
            <p>Add your primary class to get started.</p>
            <Link to="/preferences">
              <button className="btn bar__item--btn">Add primary class</button>
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
