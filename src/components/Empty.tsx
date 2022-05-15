import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../context";
import { useEffect } from "react";

const EmptyTimetable = (props) => {
  const language = useSelector((state: RootState) => state.account.language);

  return (
    <>
      <section className="timetableNav" style={{}}>
        <Link to="/" className="timetableNav__home">
          <h3>&#8249; {language === "EN" ? "Home" : "หน้าหลัก"}</h3>
        </Link>

        <Link to="/preferences" className="timetableNav__pref">
          <i className="bx bx-slider" />
        </Link>
        <img alt="user profile picture" />
      </section>
      <section className="timetableBar">
        <div className="timetableBar__text">
          <p>{language === "EN" ? "Timetable" : "ตารางสอน"}:</p>
        </div>
        <div className="timetableBar__text timetableBar__time">
          <p>{language === "EN" ? "Time" : "เวลาขณะนี้"}:</p>
        </div>
        <div className="timetableBar__input">
          <input
            type="text"
            style={{
              backgroundColor: "transparent",
            }}
            placeholder={language === "EN" ? "Search Here" : "ค้นหาวิชาตรงนี้"}
          />
        </div>
      </section>
      <section className={`timetableCon`}>
        <div className="timetableTable"></div>
      </section>
    </>
  );
};

export { EmptyTimetable };
