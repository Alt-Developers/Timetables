import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GlanceItem from "./GlanceItem";
import { modalActions } from "../context/modalSlice";
import axios from "axios";

const Glance = props => {
  const [hour, setHour] = useState(new Date().getHours());
  const [glanceInfo, setGlanceInfo] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState({
    name: "WKN",
    icon: "WKN",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [nextPeriod, setNextPeriod] = useState({ name: "WKN", icon: "WKN" });
  const [unformattedPeriod, setUnformattedPeriod] = useState({});
  const classInfo = useSelector(state => state.timetable.classInfo);
  const language = useSelector(state => state.account.language);
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://apis.ssdevelopers.xyz/timetables/getGlance", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(({ data }) => {
        console.log(data);
        setGlanceInfo(data);
        setIsLoading(false);
      });

    setInterval(() => {
      const hour = new Date().getHours();
      setHour(hour);
    }, [1800000]); // Half an hour
  }, []);

  useEffect(() => {
    if (Object.keys(glanceInfo).length !== 0 && classInfo.primaryClass) {
      setUnformattedPeriod({
        currentPeriod: glanceInfo.curClass,
        nextPeriod: glanceInfo.nextClass,
      });
      console.log({
        currentPeriod: glanceInfo.curClass,
        nextPeriod: glanceInfo.nextPeriod,
      });
      setCurrentPeriod({
        name: glanceInfo.format["classCode"][language][glanceInfo.curClass]
          .name,
        icon: glanceInfo.format["classCode"][language][glanceInfo.curClass]
          .icon,
      });
      setNextPeriod({
        name: glanceInfo.format["classCode"][language][glanceInfo.nextClass]
          .name,
        icon: glanceInfo.format["classCode"][language][glanceInfo.nextClass]
          .icon,
      });
      console.log(currentPeriod, nextPeriod);
    }
  }, [glanceInfo]);

  useEffect(() => {
    console.log(unformattedPeriod);
  }, [unformattedPeriod]);

  if (isLoading) {
    return (
      <>
        <h3 className="bar__header">At a glance</h3>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bar">
          a
        </motion.section>
      </>
    );
  }
  if (unformattedPeriod.currentPeriod === "WKN" && classInfo.primaryClass) {
    return (
      <>
        <h3 className="bar__header">At a glance</h3>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bar">
          <GlanceItem
            color={"#3fd9a5"}
            header={
              <h3>
                {language === "EN"
                  ? "It's the weekends!"
                  : "วันหยุดสัปดาห์แล้ว!"}
              </h3>
            }
            subheader={
              language === "EN"
                ? "Breaks are essential for your brain."
                : "พักผ่อนเยอะๆ นะ"
            }
            link={false}
            icon={`./icons/openBook.png`}
            size={"small"}
          />

          <GlanceItem
            color={"#eb345b"}
            header={
              <h3>
                {language === "EN" ? "Wonder which" : "ได้เวลาเตรียมตัว"}
                <br />
                {language === "EN"
                  ? "lessons are coming up?"
                  : "สำหรับสัปดาห์หน้าแล้ว"}
              </h3>
            }
            subheader={
              language === "EN"
                ? "Timetables to the rescue!"
                : "ตารางสอนอาจจะช่วยได้นะ"
            }
            link={{
              id: classInfo.primaryClass._id,
              color: userInfo.color.replace("#", ""),
              text: language === "EN" ? "View in timetable" : "ดูในตารางสอน",
            }}
            icon={`./icons/neural.png`}
            size={"large"}
            secondItem
          />
        </motion.section>
      </>
    );
  } else if (
    unformattedPeriod.currentPeriod === "FTD" &&
    unformattedPeriod.nextPeriod === "FTD" &&
    classInfo.primaryClass
  ) {
    return (
      <>
        <h3 className="bar__header">At a glance</h3>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bar">
          {unformattedPeriod.currentPeriod === "FTD" &&
          unformattedPeriod.nextPeriod === "FTD" ? (
            <>
              <GlanceItem
                color={"#fa9e1e"}
                header={
                  <h3>
                    {language === "EN"
                      ? "You finished the day"
                      : "เรียนจบวันแล้ว"}
                  </h3>
                }
                subheader={language === "EN" ? "Well done!" : "ยินดีด้วย!"}
                link={false}
                icon={`./icons/desk.png`}
                size={"small"}
              />

              <GlanceItem
                color={"#755cf7"}
                header={
                  <h3>
                    {language === "EN" ? "What books do I" : "พรุ่งนี้ต้อง"}
                    <br />
                    {language === "EN"
                      ? "need to bring tomorrow?"
                      : "เอาหนังสืออะไรไปบ้างนะ?"}
                  </h3>
                }
                subheader={
                  language === "EN"
                    ? "Maybe this timetable could help"
                    : "ลองดูตารางสอนก่อนมั้ย?"
                }
                link={{
                  id: classInfo.primaryClass._id,
                  color: userInfo.color.replace("#", ""),
                  text:
                    language === "EN" ? "View in timetable" : "ดูในตารางสอน",
                }}
                icon={`./icons/desk.png`}
                size={"large"}
                secondItem
              />
            </>
          ) : (
            <>
              {" "}
              <GlanceItem
                color={
                  "linear-gradient(45deg, rgba(105,172,234,1) 0%, rgba(110,223,100,1) 71%)"
                }
                header={
                  <h3>
                    {language === "EN"
                      ? "Current Double Period:"
                      : "ขณะนี้คาบคู่:"}
                    <br />
                    {currentPeriod.name}
                  </h3>
                }
                subheader={false}
                link={{
                  id: classInfo.primaryClass._id,
                  color: userInfo.color.replace("#", ""),
                  text:
                    language === "EN" ? "View in timetable" : "ดูในตารางสอน",
                }}
                icon={`./icons/${currentPeriod.icon}.png`}
                size={"full"}
              />
            </>
          )}
        </motion.section>
      </>
    );
  } else if (classInfo.primaryClass) {
    return (
      <>
        <h3 className="bar__header">At a glance</h3>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="bar">
          <>
            <GlanceItem
              color={"#69ACEA"}
              header={
                <h3>
                  {language === "EN" ? "Current Period:" : "ตอนนี้วิชา:"}
                  <br />
                  {currentPeriod.name}
                </h3>
              }
              subheader={false}
              link={{
                id: classInfo.primaryClass._id,
                color: userInfo.color.replace("#", ""),
                text: language === "EN" ? "View in timetable" : "ดูในตารางสอน",
              }}
              icon={`./icons/${currentPeriod.icon}.png`}
              size={"small"}
            />

            <GlanceItem
              color={"#70F094"}
              header={
                <h3>
                  {language === "EN" ? "Next Period:" : "วิชาต่อไป:"}
                  <br />
                  {nextPeriod.name}
                </h3>
              }
              secondItem
              subheader={false}
              link={{
                id: classInfo.primaryClass._id,
                color: userInfo.color.replace("#", ""),
                text: language === "EN" ? "View in timetable" : "ดูในตารางสอน",
              }}
              icon={`./icons/${nextPeriod.icon}.png`}
              size={"large"}
            />
          </>
        </motion.section>
      </>
    );
  }

  {
    if (!classInfo.primaryClass)
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
              style={{
                animation: "bgColor 5s infinite linear",
                width: "100%",
              }}>
              <h3>Welcome to Timetables!</h3>
              <p>Add your primary class to get started.</p>
              <Link to="/preferences">
                <button className="btn bar__item--btn">
                  Add primary class
                </button>
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
