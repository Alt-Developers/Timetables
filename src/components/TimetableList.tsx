// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimetableItem from "./TimetableItem";
import { motion } from "framer-motion";
import { accountActions } from "../context/accountSlice";
import { Link } from "react-router-dom";
import { RootState } from "../context";
// import { refetchActions } from "../context/refetchSlice";

const TimetableList = () => {
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.account.language);
  const classInfo = useSelector(
    (state: RootState) => state.timetable.classInfo
  );

  return (
    <>
      <h3 className="bar__header">
        {language === "EN" ? "My Timetables" : "ตารางสอนของฉัน"}
      </h3>
      {classInfo.primaryClass ? (
        <div className="box">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="bar timetable">
            <TimetableItem
              color={userInfo.color}
              text={language === "EN" ? "My Class" : "ห้องของฉัน"}
              subText={classInfo.primaryClass.className}
              id={classInfo.primaryClass._id}
            />
            {classInfo.starredClass &&
              classInfo.starredClass.map((element, index) => {
                let schoolName;
                switch (element.school) {
                  case "ASSUMPTION":
                    language === "EN"
                      ? (schoolName = "Assumption")
                      : (schoolName = "อัสสัมชัญ");
                    break;
                  case "NEWTON":
                    language === "EN"
                      ? (schoolName = "Newton")
                      : (schoolName = "นิวตัน");
                    break;
                  case "ESSENCE":
                    language === "EN"
                      ? (schoolName = "Essence")
                      : (schoolName = "เอสเซนส์");
                    break;
                  default:
                    language === "EN" ? (schoolName = "") : (schoolName = "");
                    break;
                }
                return (
                  <TimetableItem
                    style={{ width: 300 }}
                    key={index}
                    color={element.color}
                    text={element.className}
                    subText={schoolName}
                    id={element._id}
                    delay={index / 10}
                  />
                );
              })}
            <Link
              to="/preferences"
              className="timetable__item timetable__add"
              style={{
                backgroundColor: "#FFFFFF",
              }}>
              <h3 style={{ color: "#969696" }}>+</h3>
            </Link>
          </motion.section>
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="bar timetable">
          <Link
            to="/preferences"
            className="timetable__item"
            style={{
              backgroundColor: "#FFFFFF",
            }}>
            <h3 style={{ color: "#969696" }}>+</h3>
          </Link>
        </motion.section>
      )}
    </>
  );
};

export default TimetableList;
