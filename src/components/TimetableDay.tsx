import { motion } from "framer-motion";

const TimetableDay = (props) => {
  let dayName;
  let dayCode;

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
      break;
    case 4:
      props.language === "EN" ? (dayName = "Friday") : (dayName = "วันศุกร");
      dayCode = "friday";
      break;
  }

  return (
    <>
      <div className={`${dayCode} weekdays`}>{dayName}</div>
      {props.periodsArray[props.day] &&
        props.periodsArray[props.day].map((period, index) => {
          let cumulativeSpanned = 0;

          for (let i = 0; i < index; i++) {
            if (index < 2) {
              cumulativeSpanned +=
                +props.periodsArray[props.day][index - i].slice(-1);
            } else {
              cumulativeSpanned +=
                +props.periodsArray[props.day][index - i].slice(-1);
            }
          }

          if (props.school === ("NEWTON" || "ESSENCE")) {
            if (period.slice(-1) === "3") cumulativeSpanned += 1;
            if (period.slice(-1) === "2") cumulativeSpanned += 2;
            if (period.slice(-1) === "1") cumulativeSpanned += 3;
            if (cumulativeSpanned + 1 > 6) cumulativeSpanned += 1;
          } else {
            if (period.slice(-1) === "1") cumulativeSpanned += 1;
            if (cumulativeSpanned + 1 > 5) cumulativeSpanned += 1;
          }

          return (
            <motion.div
              className={`weekday`}
              key={index + 1000}
              style={
                props.highlight.day === props.day &&
                props.highlight.period === index
                  ? {
                      gridColumn: `${
                        cumulativeSpanned + 1
                      } / span ${period.slice(-1)}`,
                      color: LightenDarkenColor(props.color, -10),
                      textShadow: `0px 0px 10px ${props.color}70`,
                      opacity:
                        props.searched === null ||
                        props.searched.includes(period.slice(0, 3))
                          ? 1
                          : 0,
                    }
                  : {
                      gridColumn: `${
                        cumulativeSpanned + 1
                      } / span ${period.slice(-1)}`,
                      opacity:
                        props.searched === null ||
                        props.searched.includes(period.slice(0, 3))
                          ? 1
                          : 0,
                    }
              }
            >
              <div>{props.format[props.language][period.slice(0, 3)].name}</div>
            </motion.div>
          );
        })}
    </>
  );
};

export default TimetableDay;
