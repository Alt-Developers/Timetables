import { motion } from "framer-motion";

const GlanceItem = props => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bar__item ${props.size === "small" ? "bsmall" : "blarge"}`}
        style={{ backgroundColor: props.color }}>
        {props.header}
        {props.subheader}
        <button className="btn bar__item--btn">View in timetable</button>
        <img
          src={props.icon}
          className="bar__icon"
          alt="Science Icon"
          height="150"
        />
      </motion.div>
    </>
  );
};

export default GlanceItem;
