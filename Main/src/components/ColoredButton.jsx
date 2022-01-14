import { useState } from "react";
import { useSelector } from "react-redux";

const ColoredButton = props => {
  const [isHovering, setIsHovering] = useState();
  const userInfo = useSelector(state => state.account.userInfo);

  return (
    <button
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      className="addTimetables__submit"
      type={props.type}
      onSubmit={props.onSubmit}
      style={
        !isHovering
          ? { backgroundColor: userInfo.color }
          : {
              backgroundColor: userInfo.color,
              boxShadow: `0px 0px 20px ${userInfo.color}`,
            }
      }>
      {props.text}
    </button>
  );
};
export default ColoredButton;
