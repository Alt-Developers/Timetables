import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimetableItem from "./TimetableItem";
import { motion } from "framer-motion";
import { accountActions } from "../context/accountSlice";

const TimetableList = props => {
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <>
      <h3 className="bar__header">My Timetables</h3>
      <div className="box">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="bar timetable">
          <button
            onClick={() => {
              dispatch(accountActions.logout());
            }}>
            DEBUG: LOGOUT
          </button>
          <TimetableItem
            color={userInfo.primaryClass.color}
            text={"My Class"}
            subText={userInfo.primaryClass.className}
          />
          {userInfo.starredClasses.map(element => (
            <TimetableItem
              style={{ width: 300 }}
              key={Math.random}
              color={element.color}
              text={element.className}
            />
          ))}
          <div
            className="timetable__item"
            style={{
              backgroundColor: "#FFFFFF",
            }}>
            <h3 style={{ color: "#969696" }}>+</h3>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default TimetableList;
