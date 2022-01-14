// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimetableItem from "./TimetableItem";
import { motion } from "framer-motion";
import { accountActions } from "../context/accountSlice";
import { Link } from "react-router-dom";
// import { refetchActions } from "../context/refetchSlice";

const TimetableList = props => {
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();

  return (
    <>
      <h3 className="bar__header">My Timetables</h3>
      {userInfo.primaryClass ? (
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
            {/* <button
            onClick={() => {
              dispatch(refetchActions.refetch());
            }}>
            DEBUG: REFETCH
          </button> */}
            <TimetableItem
              color={userInfo.primaryClass.color}
              text={"My Class"}
              subText={userInfo.primaryClass.className}
              classNo={userInfo.primaryClass.classNo}
              program={userInfo.primaryClass.program}
            />
            {userInfo.starredClasses.map(element => (
              <TimetableItem
                style={{ width: 300 }}
                key={Math.random}
                color={element.color}
                text={element.className}
                classNo={element.classNo}
                program={userInfo.primaryClass.program}
              />
            ))}
            <Link
              to="/preferences"
              className="timetable__item"
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
          <button
            onClick={() => {
              dispatch(accountActions.logout());
            }}>
            DEBUG: LOGOUT
          </button>
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
