import { motion } from "framer-motion";

const TimetableDay = props => {
  let dayName;
  let dayCode;

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
                      color: props.color,
                      textShadow: `0px 0px 10px ${props.color}`,
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
              }>
              <div>{props.format[props.language][period.slice(0, 3)].name}</div>
            </motion.div>
          );
        })}
    </>
  );
};

export default TimetableDay;
