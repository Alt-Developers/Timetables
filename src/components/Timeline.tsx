import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([
    { name: "Chemistry", color: "#A3E783", emoji: "🧪" },
    { name: "Physics", color: "#F55E5E", emoji: "🍎" },
    { name: "Harvard CS50", color: "#83DBE7", emoji: "💻" },
    { name: "Harvard CS50", color: "#83DBE7", emoji: "💻" },
  ]);

  return (
    <div className="timeline__wrapper">
      <div className="timeline">
        <motion.div
          initial={{ y: "35rem" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.6,
            ease: "anticipate",
          }}
          className="timeline__item"
        >
          <div
            style={{ backgroundColor: "#9F9EE4" }}
            className="timeline__item--top"
          ></div>

          <div
            style={{ backgroundColor: "#9F9EE4", width: "50%" }}
            className="timeline__item--progress"
          ></div>

          <div className="timeline__item--text">
            <h1 className="timeline__item--emoji">🔭</h1>
            <h1>Astronomy</h1>
            <p>19 minutes elapsed</p>
          </div>

          <Link to="/" className="timeline__item--button">
            View In Timetable
          </Link>
        </motion.div>
        {timelineData.map((subject, index) => (
          <motion.div
            initial={{ y: "35rem" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              ease: "anticipate",
              delay: index * 0.1,
            }}
            className="timeline__item"
          >
            <div
              style={{ backgroundColor: subject.color }}
              className="timeline__item--top"
            ></div>

            <div
              style={{ backgroundColor: subject.color, width: "0%" }}
              className="timeline__item--progress"
            ></div>

            <div className="timeline__item--text">
              <h1 className="timeline__item--emoji">{subject.emoji}</h1>
              <h1>{subject.name}</h1>
              <p>19 minutes elapsed</p>
            </div>

            <Link to="/" className="timeline__item--button">
              View In Timetable
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
