import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../context";

const ColoredButton = props => {
  const [isHovering, setIsHovering] = useState<boolean>();
  const userInfo = useSelector((state: RootState) => state.account.userInfo);

  return (
    <button
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      className={`addTimetables__submit ${
        props.className ? props.className : ""
      }`}
      type={props.type}
      onSubmit={props.onSubmit}
      onClick={props.onClick}
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
