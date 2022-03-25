import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// import { format } from "../components/TimetableFormat";
import { motion } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css";
import TimetableDay from "../components/TimetableDay";

const Timetable = props => {
  // const { timetableID: params } = useParams();
  const [hoverMon, setHoverMon] = useState(false);
  const [hoverTue, setHoverTue] = useState(false);
  const [hoverWed, setHoverWed] = useState(false);
  const [hoverThu, setHoverThu] = useState(false);
  const [hoverFri, setHoverFri] = useState(false);
  const [periodTime, setPeriodTime] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedPeriod, setsearchedPeriod] = useState([]);
  const [timetableContent, setTimetableContent] = useState();
  const [identifier, setIdentifier] = useState();
  const [tClassName, setTClassName] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const format = useSelector(state => state.account.format);
  const userInfo = useSelector(state => state.account.userInfo);
  const dateTime = useSelector(state => state.account.config.dateTime);
  const language = useSelector(state => state.account.language);

  const timetableColor = "#" + searchParams.get("color");

  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: dateTime === "12h" ? true : false,
    })
  );

  const program = searchParams.get("program");

  useEffect(() => {
    fetch(
      `https://apis.ssdevelopers.xyz/timetables/getTimetable?classNo=${searchParams.get(
        "class"
      )}&program=${program}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          navigate("/");
        }
        setTimetableContent(data.content);
        setIdentifier(data.identifier);
        setTClassName(data.className);
      });

    window.scrollTo(0, 0);

    setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: dateTime === "12h" ? true : false,
      });
      date.getSeconds() === 0 && setClock(formatedDate);
    }, [1000]);
  }, []);

  const [timesRendered, setTimesRendered] = useState(1);
  useEffect(() => {
    setTimesRendered(timesRendered + 1);
    if (timesRendered === 2) {
      setIsLoading(false);

      let periodFull = [];
      for (const day in timetableContent) {
        timetableContent[day].map(period => {
          periodFull.push(format[program][period].name.toLowerCase());
        });
      }
      setsearchedPeriod(periodFull);
    }
  }, [timetableContent]);

  const monHoverHandler = liftedData => setHoverMon(liftedData);
  const tueHoverHandler = liftedData => setHoverTue(liftedData);
  const wedHoverHandler = liftedData => setHoverWed(liftedData);
  const thuHoverHandler = liftedData => setHoverThu(liftedData);
  const friHoverHandler = liftedData => setHoverFri(liftedData);

  const searchHandler = event => {
    const keypress = event.target.value.toLowerCase();
    let periodFull = [];
    for (const day in timetableContent) {
      timetableContent[day].map(period => {
        periodFull.push(format[program][period].name.toLowerCase());
      });
    }

    setsearchedPeriod(periodFull.filter(period => period.includes(keypress)));
  };

  if (isLoading) {
    return (
      <>
        <section
          className="timetableNav"
          style={{ backgroundColor: timetableColor }}>
          <Link to="/">
            <h3>&#8249; Home</h3>
          </Link>

          <img
            src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
            alt="user profile picture"
            height="60"
            width="60"
          />
        </section>
        <motion.div className="timetableTable"></motion.div>
      </>
    );
  }

  return (
    <>
      <section
        className="timetableNav"
        style={{ backgroundColor: timetableColor }}>
        <Link to="/" className="timetableNav__home">
          <h3>&#8249; {language === "EN" ? "Home" : "หน้าหลัก"}</h3>
        </Link>

        <Link to="/preferences" className="timetableNav__pref">
          <i class="bx bx-slider" />
        </Link>
        <img
          src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
          alt="user profile picture"
          height="50"
          width="50"
        />
      </section>
      <section className="timetableBar">
        <div className="timetableBar__text">
          <p>{language === "EN" ? "Timetable" : "ตารางสอน"}:</p>
          <h1>{tClassName} </h1>
        </div>
        <div className="timetableBar__text timetableBar__time">
          <p>{language === "EN" ? "Time" : "เวลาขณะนี้"}:</p>
          <h1>{clock}</h1>
        </div>
        <div className="timetableBar__input">
          <input
            onChange={searchHandler}
            type="text"
            style={{
              backgroundColor: timetableColor + "50",
            }}
            placeholder={language === "EN" ? "Search Here" : "ค้นหาวิชาตรงนี้"}
          />
        </div>
      </section>
      <section className={`timetableCon`}>
        {!periodTime && (
          <button
            onClick={() => {
              setPeriodTime(!periodTime);
            }}>
            Period time &#x25B2;
          </button>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="timetableTable"
          style={
            periodTime
              ? {
                  gridTemplateRows: "1fr 2fr 2fr 2fr 2fr 2fr",
                  height: "85vh",
                }
              : {}
          }>
          {periodTime && (
            <>
              <div></div>
              <div
                className="timetablePeriodTime"
                style={{ gridColumn: "2 / 5", gridRow: "1 / 2" }}>
                <h3>08:30 - 09:10</h3>
                <h3>09:20 - 10:00</h3>
                <h3 style={{ marginRight: "1rem" }}>10:10 - 10:50</h3>
                <h3 style={{ marginRight: "1rem" }}>11:00 - 11:40</h3>
                <h3>11:40 - 12:40</h3>
                <h3>12:40 - 13:20</h3>
                <h3>13:30 - 14:10</h3>
                <h3>14:20 - 15:00</h3>
              </div>
            </>
          )}

          <TimetableDay
            data={timetableContent.monday}
            program={program}
            blurred={
              hoverTue || hoverWed || hoverThu || hoverFri ? "blurred" : ""
            }
            searched={searchedPeriod}
            periodTime={periodTime}
            liftHover={monHoverHandler}
            weekday={[
              "t-r1c1",
              language === "EN" ? "Monday" : "วันจันทร์",
              "monday",
            ]}
            identifier={identifier}
            highlightColor={timetableColor}
          />

          <TimetableDay
            data={timetableContent.tuesday}
            program={program}
            blurred={
              hoverMon || hoverWed || hoverThu || hoverFri ? "blurred" : ""
            }
            searched={searchedPeriod}
            periodTime={periodTime}
            liftHover={tueHoverHandler}
            weekday={[
              "t-r2c1",
              language === "EN" ? "Tuesday" : "วันอังคาร",
              "tuesday",
            ]}
            identifier={identifier}
            highlightColor={timetableColor}
          />

          <TimetableDay
            data={timetableContent.wednesday}
            program={program}
            blurred={
              hoverMon || hoverTue || hoverThu || hoverFri ? "blurred" : ""
            }
            searched={searchedPeriod}
            periodTime={periodTime}
            liftHover={wedHoverHandler}
            weekday={[
              "t-r3c1",
              language === "EN" ? "Wednesday" : "วันพุทธ",
              "wednesday",
            ]}
            identifier={identifier}
            highlightColor={timetableColor}
          />

          <TimetableDay
            data={timetableContent.thursday}
            program={program}
            blurred={
              hoverTue || hoverWed || hoverMon || hoverFri ? "blurred" : ""
            }
            searched={searchedPeriod}
            periodTime={periodTime}
            liftHover={thuHoverHandler}
            weekday={[
              "t-r4c1",
              language === "EN" ? "Tuesday" : "วันพฤหัส",
              "thursday",
            ]}
            identifier={identifier}
            highlightColor={timetableColor}
          />

          <TimetableDay
            data={timetableContent.friday}
            program={program}
            data={timetableContent.friday}
            blurred={
              hoverTue || hoverWed || hoverMon || hoverThu ? "blurred" : ""
            }
            searched={searchedPeriod}
            periodTime={periodTime}
            liftHover={friHoverHandler}
            weekday={[
              "t-r5c1",
              language === "EN" ? "Friday" : "วันศุกร์",
              "friday",
            ]}
            identifier={identifier}
            highlightColor={timetableColor}
          />
        </motion.div>
      </section>
    </>
  );
};

export default Timetable;
