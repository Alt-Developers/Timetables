import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { RootState } from "../context";

const TimetableDay = (props) => {
  const [isHovering, setIsHovering] = useState([null, null]);
  const language = useSelector((state: RootState) => state.account.language);
  const isPhone = useMediaQuery({ query: "(max-width: 56.25em)" });
  let dayName;
  let dayCode;

  const mouseEnter = (day, index) => {
    setIsHovering([day, index]);
  };

  const mouseLeave = () => {
    setIsHovering([null, null]);
  };

  switch (props.day) {
    case 0:
      props.language === "EN" ? (dayName = "Monday") : (dayName = "วันจันทร์");
      dayCode = "monday";
      break;
    case 1:
      props.language === "EN" ? (dayName = "Tuesday") : (dayName = "วันอังคาร");
      dayCode = "tuesday";
      break;
    case 2:
      props.language === "EN" ? (dayName = "Wednesday") : (dayName = "วันพุทธ");
      dayCode = "wednesday";
      break;
    case 3:
      props.language === "EN"
        ? (dayName = "Thursday")
        : (dayName = "วันพฤหัสบดี");
      dayCode = "thursday";
      console.log(dayCode);
      break;
    case 4:
      props.language === "EN" ? (dayName = "Friday") : (dayName = "วันศุกร");
      dayCode = "friday";
      break;
  }

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

  console.log("aaa");

  return (
    <>
      <div className={`${dayCode} weekdays`}>{dayName}</div>
      {props.periodsArray[props.day] &&
        props.periodsArray[props.day].map((period, index) => {
          return (
            <motion.div
              className={`weekday`}
              key={index + 1000}
              onClick={() => mouseEnter(props.day, index)}
              style={
                props.highlight.day === props.day &&
                props.highlight.period === index
                  ? {
                      gridColumn: `span ${period.slice(-1)}`,
                      color: LightenDarkenColor(props.color, -1),
                      textShadow: `0px 0px 10px ${props.color}70`,
                      opacity:
                        props.searched === null ||
                        props.searched.includes(period.slice(0, 3))
                          ? 1
                          : 0,
                    }
                  : {
                      gridColumn: `span ${period.slice(-1)}`,
                      opacity:
                        props.searched === null ||
                        props.searched.includes(period.slice(0, 3))
                          ? 1
                          : 0,
                    }
              }
            >
              <motion.div
                className="weekday__popup"
                initial={{ opacity: 0, scale: 0.5 }}
                onMouseLeave={() => mouseLeave()}
                onTouchMove={() => mouseLeave()}
                animate={
                  isHovering[0] === props.day && isHovering[1] === index
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.05 }}
              >
                <div className="weekday__popup--top">
                  <img
                    src={`https://apis.ssdevelopers.xyz/icons/${
                      props.format[props.language][period.slice(0, 3)].icon
                    }`}
                    alt=""
                  />
                </div>
                <div className="weekday__popup--bottom">
                  <h2 style={{ userSelect: isPhone ? "none" : "text" }}>
                    {props.format[props.language][period.slice(0, 3)].name}
                  </h2>
                  <p>
                    {language === "EN"
                      ? `Period ${index + 1} of ${dayName}`
                      : `คาบที่ ${index + 1} ของ ${dayName}`}
                  </p>
                </div>
                {/* <button>To meeting</button> */}
              </motion.div>
              <p className="weekday__text">
                {props.format[props.language][period.slice(0, 3)].name}
              </p>
            </motion.div>
          );
        })}
    </>
  );
};

export default TimetableDay;
