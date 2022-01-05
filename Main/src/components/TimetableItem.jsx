import { useState } from "react";

const TimetableList = props => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="timetable__item"
      style={
        !isHovering
          ? { backgroundColor: props.color }
          : {
              backgroundColor: props.color,
              boxShadow: `0px 0px 20px ${props.color}`,
            }
      }
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}>
      <h3>{props.text}</h3>
    </div>
  );
};

export default TimetableList;
