import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { refetchActions } from "../context/refetchSlice";
import { Link } from "react-router-dom";

const TimetableList = props => {
  const [isHovering, setIsHovering] = useState(false);
  const [isRemoved, setIsRemoved] = useState();
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
    dispatch(refetchActions.refetch());

    return <></>;
  }

  if (props.classNo) {
    return (
      <Link to={`/timetable?class=${props.classNo}&program=${props.program}`}>
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
          exit={{ width: 0 }}
          transition={{ duration: 1 }}
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
        exit={{ width: 0 }}
        transition={{ duration: 1 }}
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
