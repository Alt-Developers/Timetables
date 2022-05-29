import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { RootState } from "../context";

const GlanceItem = (props) => {
  const isPhone = useMediaQuery({ query: "(max-width: 56.25em)" });
  const language = useSelector((state: RootState) => state.account.language);

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
          <h3
            style={
              isPhone
                ? {
                    backgroundColor: props.color,
                  }
                : {
                    width: props.prep ? "100%" : "70%",
                    height: props.prep ? "4rem" : "auto",
                  }
            }
          >
            {props.header}
          </h3>
        )}
        {props.prep && (
          <div className="bar__booksTmr">
            <p style={{ gridArea: "lable1" }}>
              {language === "EN" ? "Books to add" : "หนังสือที่ต้องเพิ่ม"}
            </p>
            <p style={{ gridArea: "lable2" }}>
              {language === "EN" ? "Books to remove" : "หนังสือที่ต้องเอาออก"}
            </p>
            <div className="bar__booksTmr--container">
              <div className="bar__booksTmr--left">
                {props.prep.toAdd.map((period) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span>{period.status === "toAdd" ? "+" : "-"}</span>
                    <div>{" " + period.name}</div>
                    <br />
                  </div>
                ))}
              </div>
              <div className="bar__booksTmr--right">
                {props.prep.toRemove.map((period) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span>-</span>
                    <div>{" " + period.name}</div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
