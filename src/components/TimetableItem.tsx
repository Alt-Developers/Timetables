import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { refetchActions } from "../context/refetchSlice";
import { Link } from "react-router-dom";
import { modalActions } from "../context/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "../context";
import { useMediaQuery } from "react-responsive";

interface props {
  remove?: boolean;
  disabled?: boolean;
  color?: string;
  id?: string;
  delay?: number;
  text: string;
  subText?: string;
}

const TimetableList: React.FC<props> = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const language = useSelector((state: RootState) => state.account.language);
  const dispatch = useDispatch();
  const isPhone = useMediaQuery({ query: "(max-width: 56.25em)" });
  let color;

  const LightenDarkenColor = (col, amt) => {
    let usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

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
    }).then((data) => {
      // console.log(data.json());
    });

    return <></>;
  }

  if (!props.remove) {
    return (
      <Link to={props.disabled ? "" : `/timetable/${props.id}`}>
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
          initial={{ y: isPhone ? 0 : 300, x: isPhone ? -300 : 0 }}
          animate={{ y: 0, x: 0 }}
          transition={{ delay: props.delay }}
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
                      : "ไม่สามารถนำห้องหลักของคุณออกได้",
                  text:
                    language === "EN"
                      ? "Due to system limitations you can only change your primary class to another class."
                      : "เนื่องด้วยข้อจำกัดของระบบ คุณไม่สามารถนำห้องหลักของคุณออกได้",
                })
              );
            }
          }}
        >
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
            ? {
                backgroundColor: props.color,
                border: `10px solid ${LightenDarkenColor(props.color, -1)}`,
              }
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
        }}
      >
        <h3>{props.text}</h3>
        <h4>{props.subText}</h4>
      </motion.div>
    );
  }
};

export default TimetableList;
