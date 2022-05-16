import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const GlanceItem = (props) => {
  const isPhone = useMediaQuery({ query: "(max-width: 56.25em)" });

  return (
    <>
      <motion.div
        initial={
          props.animation === "none"
            ? { y: 0 }
            : { y: isPhone ? 0 : 300, x: isPhone ? -300 : 0 }
        }
        animate={{ y: 0, x: 0 }}
        transition={
          props.secondItem ? { duration: 0.1, delay: 0.05 } : { duration: 0.1 }
        }
        className={`bar__item ${props.size === "small" && "bsmall"} ${
          props.size === "large" && "blarge"
        } ${props.size === "full" && "bfull"}`}
        style={{
          background: props.background
            ? `url(${props.background})`
            : props.color,
        }}
      >
        {props.header && (
          <h3 style={isPhone ? { backgroundColor: props.color } : {}}>
            {props.header}
          </h3>
        )}
        {props.subheader && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {props.subheader}
          </motion.p>
        )}
        {props.link && (
          <Link
            to={`/timetable?id=${
              props.link.id
            }&color=${props.link.color.replace("#", "")}`}
          >
            <button className="btn bar__item--btn">{props.link.text}</button>
          </Link>
        )}
        {props.a && (
          <a href={props.a.href}>
            <button className="btn bar__item--btn">{props.a.text}</button>
          </a>
        )}
        {props.icon && (
          <img src={props.icon} className="bar__icon" alt="" height="150" />
        )}
      </motion.div>
    </>
  );
};

export default GlanceItem;
