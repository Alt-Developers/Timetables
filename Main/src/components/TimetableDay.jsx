import { format } from "./TimetableFormat";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";

const TimetableDay = props => {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    props.liftHover(hovering);
  }, [hovering]);

  return (
    <>
      <div
        className={`${props.weekday[0]} weekdays ${props.blurred}`}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}>
        {props.weekday[1]}
      </div>
      <div className={`periods__morning ${props.blurred}`}>
        {props.data.slice(0, 3).map(period => (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={
              !props.searched.includes(
                format[props.program][period].name.toLowerCase()
              )
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ delay: 0.35 }}
            className={`${
              !props.searched.includes(
                format[props.program][period].name.toLowerCase()
              ) && "hidden"
            }
      `}
            key={Math.random()}>
            {format[props.program][period].name.length > 11 ? (
              <>
                {format[props.program][period].name.split(" ")[0]} <br />
                {format[props.program][period].name.split(" ")[1]}
              </>
            ) : (
              format[props.program][period].name
            )}
          </motion.h3>
        ))}
      </div>
      <div
        className="t-r1c3"
        style={
          props.periodTime
            ? { gridColumn: "3 /  4", gridRow: "2 / span 5" }
            : {}
        }>
        <h3>Lunch Break</h3>
      </div>
      <div className={`periods__afternoon ${props.blurred}`}>
        {props.data.slice(3, 7).map(period => (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={
              !props.searched.includes(
                format[props.program][period].name.toLowerCase()
              )
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ delay: 0.35 }}
            key={Math.random()}>
            {format[props.program][period].name.length > 11 ? (
              <>
                {format[props.program][period].name.split(" ")[0]} <br />
                {format[props.program][period].name.split(" ")[1]}
              </>
            ) : (
              format[props.program][period].name
            )}
          </motion.h3>
        ))}
      </div>
    </>
  );
};

export default TimetableDay;
