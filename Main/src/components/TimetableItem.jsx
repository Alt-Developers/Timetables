import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { refetchActions } from "../context/refetchSlice";
import { Link } from "react-router-dom";
import { modalActions } from "../context/modalSlice";
import { useSelector } from "react-redux";

const TimetableList = props => {
  const [isHovering, setIsHovering] = useState(false);
  const [isRemoved, setIsRemoved] = useState();
  const language = useSelector(state => state.account.language);
  const dispatch = useDispatch();
  let color;

  if (props.remove) {
    color = "#ff1d19";
  } else if (props.disabled) {
    color = "#b0b0b0";
  } else {
    color = props.color;
  }

  if (isRemoved) {
    fetch("https://apis.ssdevelopers.xyz/timetables/removeUserClass", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        classId: props.id,
      }),
    }).then(data => {
      console.log(data.json());
    });

    return <></>;
  }

  if (!props.remove) {
    return (
      <Link
        to={
          props.disabled
            ? ""
            : `/timetable?id=${props.id}&color=${props.color.replace("#", "")}`
        }>
        <motion.div
          className={`timetable__item ${props.remove && "shake"}`}
          style={
            !isHovering
              ? { backgroundColor: props.color }
              : {
                  backgroundColor: color,
                  boxShadow: `0px 0px 20px ${color}`,
                }
          }
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: props.delay }}
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
          onClick={() => {
            if (props.remove) {
              setIsRemoved(true);
            }
            if (props.disabled) {
              dispatch(
                modalActions.openModal({
                  header:
                    language === "EN"
                      ? "You can't remove your primary class"
                      : "ไม่สามารถลบห้องหลักของคุณได้",
                  text:
                    language === "EN"
                      ? "You can only change your primary class to another class."
                      : "คุณสามารถทำได้แค่เปลี่ยนห้องหลักคุณได้",
                })
              );
            }
          }}>
          <h3>{props.text}</h3>
          <h4>{props.subText}</h4>
        </motion.div>
      </Link>
    );
  } else {
    return (
      <motion.div
        className={`timetable__item ${props.remove && "shake"}`}
        style={
          !isHovering
            ? { backgroundColor: props.color }
            : {
                backgroundColor: color,
                boxShadow: `0px 0px 20px ${color}`,
              }
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onClick={() => {
          if (props.remove) {
            setIsRemoved(true);
          }
        }}>
        <h3>{props.text}</h3>
        <h4>{props.subText}</h4>
      </motion.div>
    );
  }
};

export default TimetableList;
