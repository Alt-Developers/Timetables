import TimetableDay from "../components/TimetableDay";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { RootState } from "../context";
import TimetableClock from "../components/TimetableClock";

const Timetable = () => {
  // State
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
  const [image, setImage] = useState<File>();
  const [status, setStatus] = useState<"outdated" | "uptodate">();
  const [curTheme, setCurTheme] = useState(
    localStorage.getItem("theme") ?? "light"
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const language = useSelector((state: RootState) => state.account.language);
  const isTabLand = useMediaQuery({ query: "(max-width: 75em)" });
  const navigate = useNavigate();

  const timetableColor = "#" + searchParams.get("color");
  const isNewton = timetableData?.school === "NEWTON";

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

        console.log(data);
        document.title = `${data.className} | SS Timetables`;
        setTimeLayout(data.timetableTimeLayout);
        setIdentifier(data.identifier);
        setFormat(data.timetableFormat.classCode);
        setTimetableData(data.timetableData);
        setTimetableName(data.className);
        setRefresherTime(data.refresher);
        setStatus(
          data.isPrimaryClass && data.status === "outdated"
            ? "outdated"
            : "uptodate"
        );

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

            console.log(data.timetableFormat);

            while (dayArray.length !== data.timetableTimeLayout.length - 1) {
              dayArray.push("EMP");
            }
            console.log(dayArray);

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
      const advanceTime: number | string =
        date.getHours() +
        (date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes() +
        (date.getSeconds() < 10 ? "0" : "") +
        date.getSeconds();
      // @ts-ignore
      if (refresherTime.includes(advanceTime.toString()))
        setRefresher(refresher + 1);
    }, 1000);

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
        <i
          style={{ marginRight: "0" }}
          onClick={() => {
            navigator.clipboard.writeText(`${searchParams.get("id")}`);
            setCopied(true);
          }}
          className={`bx ${copied ? "bx-check" : "bx-link"} timetableNav__pref`}
        ></i>
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
      {status === "outdated" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "ease-in" }}
          className="timetableAlert"
          style={{ backgroundColor: timetableColor + "70" }}
        >
          <div>
            <div className="timetableAlert__header">
              <p>
                {language === "EN" ? "Hi there" : "ว่าไง"} {userInfo.firstName}{" "}
                {userInfo.lastName}!
              </p>
              <h1>
                {language === "EN"
                  ? "This timetable needs an update"
                  : "ตารางเรียนนี้ต้องการ การอัปเดท"}
              </h1>
            </div>

            <p>
              {language === "EN"
                ? `We've detected that your class (${timetableName})'s timetables hasn't been updated for this semester's timetable. To keep your timetables updated can you kindly send us a photo of your timetableใ Thanks!`
                : "พวกเราเห็นว่าตารางเรียนของคุณนั้นไม่ใช่รุ่นล่าสุด. เพิ่อที่จะให้ตารางเรียนของคุณนั้นเป็นรุ่นล่าสุดกรุณาแนบภาพ"}
            </p>
          </div>

          <button
            className="timetableAlert__selectImage"
            type="button"
            style={{
              backgroundColor: timetableColor + "20",
              border: `2px solid ${timetableColor}`,
            }}
          >
            <input
              onChange={(event) => {
                setImage(event.currentTarget.files?.[0]);
              }}
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
            ></input>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="userProfile"
                height="150px"
                width="150px"
                className="simpleModal__preview"
                style={{ scale: 0.7 }}
              />
            ) : (
              <i className="bx bx-image-add simpleModal__imga"></i>
            )}
          </button>
        </motion.div>
      )}
      <section className="timetableBar">
        <div className="timetableBar__text">
          <p>{language === "EN" ? "Timetable" : "ตารางสอน"}:</p>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {timetableName}{" "}
          </motion.h1>
        </div>
        <div className="timetableBar__text timetableBar__time">
          <p>{language === "EN" ? "Date" : "เวลาขณะนี้"}:</p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ lineHeight: "4.3rem" }}
          >
            {new Date().toLocaleString(language === "EN" ? "en-US" : "th-TH", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </motion.h1>
        </div>
        <div className="timetableBar__text timetableBar__time">
          <p>{language === "EN" ? "Time" : "เวลาขณะนี้"}:</p>

          <TimetableClock dateTime={userInfo.config?.dateTime} />
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
            // DONT TOUCH - It works 😊
            gridTemplateColumns: `${
              isNewton ? (isTabLand ? "12rem " : "2fr ") : ""
            }repeat(${isNewton ? timeLayout.length : timeLayout.length + 1}, ${
              isTabLand ? (isNewton ? "6.5rem" : "15rem") : "1fr"
            })`,
            height: "85vh",
          }}
        >
          <div
            className="timetablePeriodTime"
            style={{
              borderRadius: "1.1rem",
              margin: "0 0 0 0 !important",
            }}
          >
            <h3 style={{ borderRadius: "1.1rem !important" }}></h3>
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
                  ? "timetablePeriodTime__last"
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
              // highlight={{
              //   day: 1,
              //   period: 1,
              // }}
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
                    gridColumn: isNewton
                      ? "8 / 9"
                      : timetableData?.school === "ESSENCEP"
                      ? "4/5"
                      : "6 / 7",
                    pointerEvents: "none",
                    gridRow: "2/7",
                    display: "grid",
                    placeItems: "center",
                  }
                : {
                    gridColumn: isNewton
                      ? "8 / 9"
                      : timetableData?.school === "ESSENCEP"
                      ? "4/5"
                      : "5 / 6",
                    gridRow: "2/7",
                    display: "grid",
                    pointerEvents: "none",
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
