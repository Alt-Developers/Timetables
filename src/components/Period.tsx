import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../context";

const Period = (props) => {
  const language = useSelector((state: RootState) => state.account.language);
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

  return (
    <motion.div
      className={`weekday`}
      key={props.index + 1000}
      onClick={() => props.mouseEnter(props.day, props.index)}
      style={
        props.highlight.day === props.day &&
        props.highlight.period === props.index
          ? {
              gridColumn: `span ${props.period.slice(-1)}`,
              color: LightenDarkenColor(props.color, -1),
              textShadow: `0px 0px 10px ${props.color}70`,
              opacity:
                props.searched === null ||
                props.searched.includes(props.period.slice(0, 3))
                  ? 1
                  : 0,
            }
          : {
              gridColumn: `span ${props.period.slice(-1)}`,
              opacity:
                props.searched === null ||
                props.searched.includes(props.period.slice(0, 3))
                  ? 1
                  : 0,
            }
      }
    >
      <motion.div
        className="weekday__popup"
        initial={{ opacity: 0, scale: 0.5 }}
        onMouseLeave={() => props.mouseLeave()}
        onTouchMove={() => props.mouseLeave()}
        animate={
          props.isHovering[0] === props.day &&
          props.isHovering[1] === props.index
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1 }
        }
        transition={{ duration: 0.05 }}
      >
        <div className="weekday__popup--top">
          <img
            src={`https://apis.ssdevelopers.xyz/icons/${
              props.format[language][props.period.slice(0, 3)].icon
            }`}
            alt=""
          />
        </div>
        <div className="weekday__popup--bottom">
          <h2 style={{ userSelect: props.isPhone ? "none" : "text" }}>
            {props.format[language][props.period.slice(0, 3)].name}
          </h2>
          <p>
            {language === "EN"
              ? `Period ${props.index + 1} of ${props.dayName}`
              : `คาบที่ ${props.index + 1} ของ ${props.dayName}`}
          </p>
        </div>
        {/* <button>To meeting</button> */}
      </motion.div>
      <p className="weekday__text">
        {props.format[language][props.period.slice(0, 3)].name}
      </p>
    </motion.div>
  );
};

export default Period;
