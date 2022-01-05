import { useState } from "react";
import TimetableItem from "./TimetableItem";

const TimetableList = props => {
  return (
    <>
      <h3 className="bar__header">My Timetables</h3>
      <section className="bar timetable">
        <TimetableItem color={"#FF8A00"} text={"My Class"} />
        <TimetableItem color={"#F95E5E"} text={"2/3"} />
        <TimetableItem color={"#9e34eb"} text={"EP 2/3"} />
        <div
          className="timetable__item"
          style={{
            backgroundColor: "#FFFFFF",
          }}>
          <h3 style={{ color: "#969696" }}>+</h3>
        </div>
      </section>
    </>
  );
};

export default TimetableList;
