import TimetableDay from "../components/TimetableDay";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { RootState } from "../context";

const Timetable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const language = useSelector((state: RootState) => state.account.language);
  const navigate = useNavigate();
  const [timeLayout, setTimeLayout] = useState<string[]>([]);
  const [timetableData, setTimetableData] = useState<any>({});
  const [format, setFormat] = useState({});
  const [timetableName, setTimetableName] = useState();
  const [mergedPeriods, setMergedPeriods] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [formattedPeriods, setFormattedPeriods] = useState([]);
  const [identifier, setIdentifier] = useState<any>({});
  const [searchedArray, setSearchedArray] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresher, setRefresher] = useState(1);
  const [refresherTime, setRefresherTime] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const isTabLand = useMediaQuery({ query: "(max-width: 75em)" });
  const [curTheme, setCurTheme] = useState(
    localStorage.getItem("theme") ?? "light"
  );

  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: userInfo?.config?.dateTime === "12h" ? true : false,
    })
  );

  const timetableColor = "#" + searchParams.get("color");
  const isNewton = timetableData?.school === ("NEWTON" || "ESSENCE");

  useEffect(() => {
    // console.log("Re-fetched!");
    fetch(
      `https://apis.ssdevelopers.xyz/timetables/getTimetable/${searchParams.get(
        "id"
      )}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.error) navigate("/");

        // console.log(data);
        document.title = `${data.className} | SS Timetables`;
        setIdentifier(data.identifier);
        setFormat(data.timetableFormat.classCode);
        setTimetableData(data.timetableData);
        setTimetableName(data.className);
        setRefresherTime(data.refresher);

        switch (data.timetableData.school) {
          case "ASSUMPTION":
            setTimeLayout([
              "08:00 - 08:30",
              "08:30 - 09:20",
              "09:20 - 10:10",
              "10:10 - 11:40",
              "11:40 - 12:40",
              "12:40 - 13:40",
              "13:40 - 14:20",
              "14:20 - 15:00",
            ]);
            break;
          case "NEWTON":
            setTimeLayout([
              "9:00 - 9:30",
              "9:30 - 10:00",
              "10:00 - 10:20",
              "10:30 - 11:00",
              "11:00 - 11:30",
              "11:30 - 12:00",
              "12:00 - 13:00",
              "13:00 - 13:30",
              "13:30 - 14:00",
              "14:00 - 14:20",
              "14:30 - 15:00",
              "15:00 - 15:30",
              "15:30 - 15:50",
              "16:00 - 16:30",
              "16:30 - 17:00",
              "17:00 - 17:30",
            ]);
            break;
        }

        const timetableContent = data.timetableData.timetableContent;
        for (const day in timetableContent) {
          timetableContent[day] = timetableContent[day].filter(
            (period: any) => period !== "FTD"
          );
        }

        if (mergedPeriods.length < 4) {
          for (const day in timetableContent) {
            const dayArray = timetableContent[day];
            const positionsArray: any[] = [];
            const mergedArray: any[] = [];
            const formattedArr: any[] = [];
            const counts = {};

            // maping dayArray to get mergedArray and positionsArray
            dayArray.forEach((period) => {
              counts[period] = (counts[period] || 0) + 1;
              if (!positionsArray.includes(period)) {
                positionsArray.push(period);
              }
            });

            positionsArray.map((position) =>
              mergedArray.push(`${position}${counts[position]}`)
            );

            mergedArray.map((period) => {
              return formattedArr.push([
                data.timetableFormat.classCode[language][period.slice(0, 3)]
                  .name,
                period.slice(0, 3),
              ]);
            });

            // @ts-ignore
            setFormattedPeriods((formattedPeriods) => [
              ...formattedPeriods,
              ...formattedArr,
            ]);
            // @ts-ignore
            setMergedPeriods((mergedPeriods) => [
              ...mergedPeriods,
              mergedArray,
            ]);
          }
        }

        setIsLoading(false);
      });
  }, [refresher]);

  useEffect(() => {
    if (refresherTime.length !== 0) {
      setRefreshCount(refreshCount + 1);
    }
  }, [refresherTime]);

  let intervalId;
  useEffect(() => {
    // let startingDate = new Date("2022-04-04T14:29:55").getTime();
    intervalId = setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: userInfo?.config?.dateTime === "12h" ? true : false,
      });
      const advanceTime: number | string =
        date.getHours() +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes() +
        (date.getSeconds() < 10 ? "0" : "") +
        date.getSeconds();
      // @ts-ignore
      if (refresherTime.includes(advanceTime.toString()))
        setRefresher(refresher + 1);

      setClock(formatedDate);
      // @ts-ignore
    }, [1000]);

    window.scrollTo(0, 0);

    // cleanup function
    return () => clearInterval(intervalId);
  }, [refreshCount]);

  const searchKeypressHandler = (event) => {
    const keypress = event.target.value;
    const searchedArray = [];
    const regex = new RegExp(keypress, "i");
    setSearchValue(keypress);

    formattedPeriods.forEach((cur, index) => {
      if (regex.test(cur[0])) searchedArray.push(cur[1]);
    });
    setSearchedArray([...new Set(searchedArray)]);
  };

  if (isLoading) {
    return (
      <>
        <section
          className="timetableNav"
          style={{ backgroundColor: timetableColor }}
        >
          <Link to="/" className="timetableNav__home">
            <h3>&#8249; {language === "EN" ? "Home" : "หน้าหลัก"}</h3>
          </Link>

          <Link to="/preferences" className="timetableNav__pref">
            <i className="bx bx-slider" />
          </Link>
          <img
            src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
            alt="user profile picture"
          />
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
                backgroundColor: timetableColor + "50",
              }}
              onChange={searchKeypressHandler}
              value={searchValue}
              placeholder={
                language === "EN" ? "Search Here" : "ค้นหาวิชาตรงนี้"
              }
            />
          </div>
        </section>
        <section className={`timetableCon`}>
          <div className="timetableTable"></div>
        </section>
      </>
    );
  }

  return (
    <>
      <section
        className="timetableNav"
        style={{ backgroundColor: timetableColor }}
      >
        <Link to="/" className="timetableNav__home">
          <h3>&#8249; {language === "EN" ? "Home" : "หน้าหลัก"}</h3>
        </Link>

        <button
          className="timetableNav__themeSwitcher"
          onClick={() => {
            if (curTheme === "light") {
              document.documentElement.setAttribute("data-theme", "dark");
              setCurTheme("dark");
              localStorage.setItem("theme", "dark");
            } else {
              document.documentElement.setAttribute("data-theme", "light");
              setCurTheme("light");
              localStorage.setItem("theme", "light");
            }
          }}
        >
          {curTheme === "light" ? (
            <i className="bx bx-sun"></i>
          ) : (
            <i className="bx bx-moon"></i>
          )}
        </button>
        <Link to="/preferences" className="timetableNav__pref">
          <i className="bx bx-slider" />
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
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {timetableName}{" "}
          </motion.h1>
        </div>
        <div className="timetableBar__text timetableBar__time">
          <p>{language === "EN" ? "Time" : "เวลาขณะนี้"}:</p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {clock}
          </motion.h1>
        </div>
        <div className="timetableBar__input">
          <input
            type="text"
            style={{
              backgroundColor: timetableColor + "50",
            }}
            onChange={searchKeypressHandler}
            value={searchValue}
            placeholder={language === "EN" ? "Search Here" : "ค้นหาวิชาตรงนี้"}
          />
        </div>
      </section>
      <section className={`timetableCon`}>
        <motion.div
          className="timetableTable"
          style={{
            gridTemplateRows: "1fr 2fr 2fr 2fr 2fr 2fr",
            gridTemplateColumns: `${
              isNewton ? (isTabLand ? "12rem " : "2fr ") : ""
            }repeat(${
              isNewton ? timeLayout.length - 1 : timeLayout.length + 1
            }, ${isTabLand ? (isNewton ? "6.5rem" : "15rem") : "1fr"})`,
            height: "85vh",
          }}
        >
          <div
            className="timetablePeriodTime"
            style={{
              borderRadius: "1.1rem 0 0 1.1rem !important",
              margin: "0 0 0 0 !important",
            }}
          >
            <h3></h3>
          </div>
          {timeLayout.map((element, index) => (
            <div
              style={
                timeLayout.length > 10
                  ? {
                      fontSize: ".9rem",
                      margin: " 0 -0.5rem 0 -0.5rem",
                      borderRadius: "0",
                    }
                  : {
                      fontSize: "1.3rem",
                      margin: " 0 -0.5rem 0 -0.5rem",
                      borderRadius: "0",
                    }
              }
              className={`timetablePeriodTime ${
                index === 0 ? "timetablePeriodTime__first" : ""
              } ${
                index === timeLayout.length - 1
                  ? isNewton
                    ? "timetablePeriodTime__last"
                    : ""
                  : ""
              }`}
              key={index}
            >
              <h3>{element}</h3>
            </div>
          ))}

          {mergedPeriods.map((day, index) => (
            <TimetableDay
              periodsArray={mergedPeriods}
              day={index}
              language={language}
              format={format}
              school={timetableData?.school}
              highlight={{
                day: identifier?.today - 1,
                period: identifier?.curClass,
              }}
              color={timetableColor}
              searched={searchedArray}
            />
          ))}

          <div
            className="weekday"
            style={
              identifier?.curClass === -70
                ? {
                    color: timetableColor,
                    textShadow: `0px 0px 10px ${timetableColor}`,
                    gridColumn: isNewton ? "8 / 9" : "6 / 7",
                    gridRow: "2/7",
                    display: "grid",
                    placeItems: "center",
                  }
                : {
                    gridColumn: isNewton ? "8 / 9" : "6 / 7",
                    gridRow: "2/7",
                    display: "grid",
                    placeItems: "center",
                  }
            }

            // style={{
            // gridColumn: isNewton ? "8 / 9" : "6 / 7",
            // gridRow: "2/7",
            // display: "grid",
            // placeItems: "center",
            // }}
          >
            {language === "EN" ? "Lunch" : "พักกลางวัน"}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Timetable;
