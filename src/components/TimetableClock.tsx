import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TimetableClock = (props) => {
  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: props.dateTime === "12h" ? true : false,
    })
  );

  let clockInterval;
  useEffect(() => {
    clockInterval = setInterval(() => {
      setClock(
        new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: props.dateTime === "12h" ? true : false,
        })
      );
    }, 1000);

    return () => clearInterval(clockInterval);
  });

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {clock}
    </motion.h1>
  );
};

export default TimetableClock;
