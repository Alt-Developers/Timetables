import { period } from "../models/TimetableTypes";
import { useState } from "react";

const TimetableDay: React.FC<{
  day: string;
  content: period[];
  activePeriod: number;
}> = props => {
  //   const [activePeriod, setActivePeriod] = useState(1);
  const [date, setDate] = useState(new Date());
  const weekday = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return (
    <>
      <div className="block weekdays">{props.day}</div>
      {props.content.map((period: period, periodIndex) => (
        <div
          className={
            // testing
            props.day === weekday[1] && periodIndex === props.activePeriod
              ? "block activeBlock"
              : "block"
          }
          key={periodIndex}
        >
          {period.name}
        </div>
      ))}
    </>
  );
};

export default TimetableDay;
