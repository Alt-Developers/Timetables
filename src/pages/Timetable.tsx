import TimetableDay from "../components/TimetableDay";

import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { period, timetable } from "../models/TimetableTypes";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Timetable = () => {
  const { timetableId } = useParams();
  const [searchParams] = useSearchParams();
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [timetablePane, setTimetablePane] = useState(
    searchParams.get("pane") === null ? "timetable" : searchParams.get("pane")
  );
  const allowedTimetablePanes = ["timetable", "board"];
  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h12",
    })
  );
  const [timetableData, setTimetableData] = useState<any>({
    className: "Year 11A",
    school: "Alternate",
    timeLayout: [
      "09:00 - 10:30",
      "10:30 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:30",
      "13:00 - 14:30",

      "13:00 - 14:30",
    ],
    timetableContent: {
      monday: [
        {
          name: "Math",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1b",
        },
        {
          name: "Thinking",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1c",
        },
        {
          name: "Lunch",
          tag: "break",
          _id: "6355629ca8b1d05c0328de21",
        },
        {
          name: "English A",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1f",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
      ],
      tuesday: [
        {
          name: "Math",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1b",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "Lunch",
          tag: "break",
          _id: "6355629ca8b1d05c0328de21",
        },
        {
          name: "English A",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1f",
        },
        {
          name: "Chemistry",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1e",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
      ],
      wednesday: [
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "Lunch",
          tag: "break",
          _id: "6355629ca8b1d05c0328de21",
        },
        {
          name: "English A",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1f",
        },
        {
          name: "Physics",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1d",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
      ],
      thursday: [
        {
          name: "Math",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1b",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "Lunch",
          tag: "break",
          _id: "6355629ca8b1d05c0328de21",
        },
        {
          name: "English A",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1f",
        },
        {
          name: "English A",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1f",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
      ],
      friday: [
        {
          name: "Math",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1b",
        },
        {
          name: "Lunch",
          tag: "break",
          _id: "6355629ca8b1d05c0328de21",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "Physics",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1d",
        },
        {
          name: "Thinking",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de1c",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
        {
          name: "English SL",
          tag: "subject",
          _id: "6355629ca8b1d05c0328de20",
        },
      ],
      saturday: [],
      sunday: [],
    },
    identifier: {
      isConditional: false,
      curClass: 1,
      nextClass: 2,
      prevClass: 0,
    },
  });

  useEffect(() => {
    let clockInterval = setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        // hourCycle: dateTime === "12h" ? "h12" : "h23",
        hourCycle: "h12",
      });
      date.getSeconds() === 0 && setClock(formatedDate);
      // @ts-ignore
    }, [1000]);

    let data = {
      className: "Year 11A",
      school: "Alternate",
      timeLayout: [
        "09:00 - 10:30",
        "10:30 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:30",
        "13:00 - 14:30",

        "13:00 - 14:30",
      ],
      timetableContent: {
        monday: [
          {
            name: "Math",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1b",
          },
          {
            name: "Thinking",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1c",
          },
          {
            name: "Lunch",
            tag: "break",
            _id: "6355629ca8b1d05c0328de21",
          },
          {
            name: "English A",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1f",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
        ],
        tuesday: [
          {
            name: "Math",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1b",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "Lunch",
            tag: "break",
            _id: "6355629ca8b1d05c0328de21",
          },
          {
            name: "English A",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1f",
          },
          {
            name: "Chemistry",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1e",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
        ],
        wednesday: [
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "Lunch",
            tag: "break",
            _id: "6355629ca8b1d05c0328de21",
          },
          {
            name: "English A",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1f",
          },
          {
            name: "Physics",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1d",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
        ],
        thursday: [
          {
            name: "Math",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1b",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "Lunch",
            tag: "break",
            _id: "6355629ca8b1d05c0328de21",
          },
          {
            name: "English A",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1f",
          },
          {
            name: "English A",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1f",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
        ],
        friday: [
          {
            name: "Math",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1b",
          },
          {
            name: "Lunch",
            tag: "break",
            _id: "6355629ca8b1d05c0328de21",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "Physics",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1d",
          },
          {
            name: "Thinking",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de1c",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
          {
            name: "English SL",
            tag: "subject",
            _id: "6355629ca8b1d05c0328de20",
          },
        ],
        saturday: [],
        sunday: [],
      },
      identifier: {
        isConditional: false,
        curClass: 1,
        nextClass: 2,
        prevClass: 0,
      },
    };

    const timetableContent = data.timetableContent;
    // BreakVerticalMerger
    let dayBreakIndexes = [];
    let dayIndex = 0;
    for (const day in timetableContent) {
      // @ts-ignore
      const breakIndex = timetableContent[day].findIndex(
        (period: period) => period.tag === "break"
      );

      if (breakIndex > 0) {
        dayBreakIndexes.push({ dayIndex, breakIndex });
      }

      console.log(dayIndex, breakIndex);
      dayIndex++;
    }
    console.log(dayBreakIndexes);

    // PeriodMerger
    // for (const day in timetableContent) {
    //   // @ts-ignore
    //   const dayWithSpan = timetableContent[day].map(day => {
    //     day.span = 1;
    //     return day;
    //   });
    //   console.log(dayWithSpan);

    //   // @ts-ignore
    //   dayWithSpan.reduce((previousPeriod, currentPeriod) => {
    //     const { name, span } = currentPeriod;
    //     const periodIndex = previousPeriod.findIndex(
    //       (currentPeriod: period) => currentPeriod.name === name
    //     );
    //     if (periodIndex === -1) {
    //       previousPeriod.push(currentPeriod);
    //     } else {
    //       previousPeriod[periodIndex].span += span;
    //     }

    //     return previousPeriod;
    //   });
    //   // @ts-ignore
    //   console.log(timetableContent[day]);
    // }

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <section className="timetable">
      <div className="timetable__nav">
        <Link to="/">
          <i className="bx bx-left-arrow-alt"></i>Home
        </Link>

        <div className="timetable__options">
          <Link
            to="#"
            onClick={() => {
              if (
                theme === "light" &&
                localStorage.getItem("theme") === "light"
              ) {
                setTheme("dark");
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                toast("Theme is set to dark", { duration: 1000, icon: "🌙" });
              }
              if (
                theme === "dark" &&
                localStorage.getItem("theme") === "dark"
              ) {
                setTheme("light");
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                toast("Theme is set to light", { duration: 1000, icon: "☀️" });
              }
            }}
          >
            <i className={theme === "light" ? "bx bx-sun" : "bx bx-moon"}></i>
          </Link>
          <Link
            to="#"
            onClick={() => {
              navigator.clipboard.writeText(timetableId ?? "");
              toast.success("Copied TimetableID to your clipboard", {
                duration: 2000,
              });
            }}
          >
            <i className="bx bx-link"></i>
          </Link>
          {/* <a
            href="#"
            onClick={() => {
              document.body.requestFullscreen();
            }}
          >
            <i className="bx bx-fullscreen"></i>
          </a> */}
        </div>
      </div>

      <div className="timetable__top">
        <h1 className="timetable__title">
          M 3/6{" "}
          <span>
            {new Date().toLocaleString("en-US", {
              weekday: "long",
            })}
            {" , "}
            {clock}
          </span>
        </h1>
        <div className="timetable__chips">
          <div
            className={
              timetablePane === "board"
                ? "timetable__chip timetable__activeChip"
                : "timetable__chip"
            }
            onClick={() => setTimetablePane("board")}
          >
            Board
          </div>
          <div
            className={
              timetablePane === "timetable"
                ? "timetable__chip timetable__activeChip"
                : "timetable__chip"
            }
            onClick={() => setTimetablePane("timetable")}
          >
            Timetable
          </div>
        </div>
      </div>

      <div className="timetable__paneAnchor">
        <motion.div
          className="timetable__table"
          initial={{ opacity: 0, x: "10rem" }}
          transition={{ duration: 0.2 }}
          animate={
            timetablePane === "timetable"
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: "10rem" }
          }
        >
          <div className="block unHoverable"></div>
          <div
            className="block timeLayout unHoverable"
            style={{ gridColumn: `span ${timetableData.timeLayout.length}` }}
          >
            {timetableData.timeLayout.map((time: string, index: number) => (
              <div key={index}>{time}</div>
            ))}
          </div>

          <TimetableDay
            day="monday"
            content={timetableData.timetableContent.monday}
            activePeriod={timetableData.identifier.curClass}
          />
          <TimetableDay
            day="tuesday"
            content={timetableData.timetableContent.tuesday}
            activePeriod={timetableData.identifier.curClass}
          />
          <TimetableDay
            day="wednesday"
            content={timetableData.timetableContent.wednesday}
            activePeriod={timetableData.identifier.curClass}
          />
          <TimetableDay
            day="thursday"
            content={timetableData.timetableContent.thursday}
            activePeriod={timetableData.identifier.curClass}
          />
          <TimetableDay
            day="friday"
            content={timetableData.timetableContent.friday}
            activePeriod={timetableData.identifier.curClass}
          />
        </motion.div>

        <motion.div
          className="timetable__board"
          initial={{ opacity: 0, x: "-10rem" }}
          transition={{ duration: 0.2 }}
          animate={
            timetablePane === "board"
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: "-10rem" }
          }
        >
          <div className="timetable__boardLeft">
            <div className="timetable__newPost">
              <div>
                <img
                  src="https://pbs.twimg.com/profile_images/1509787105425526787/WdSeMffL_400x400.jpg"
                  alt=""
                />
                <p>You</p>
              </div>
              <input type="text" placeholder="Post something to the board..." />
              <button type="submit">Post</button>
            </div>
            <div className="timetable__post">
              <div className="timetable__post--title">
                <img
                  src="https://genshin.honeyhunterworld.com/img/xiao_026.webp"
                  alt=""
                />
                <p>Xiao</p>
              </div>
              <h3>
                If you awake to a knife at your throat, if monsters dig their
                claws into you, if death comes knocking at your door, call out
                my name. Adeptus Xiao. I will be here when you call.
              </h3>
            </div>
          </div>
          <div className="timetable__boardRight">
            <div className="timetable__post">
              <div className="timetable__post--title">
                <img src="https://i.ibb.co/tsc83Cr/Frame-3.png" alt="" />
                <p>Alternate Assistance</p>
              </div>
              <h3>
                Welcome to your <span className="accent">Timetable Board!</span>{" "}
                <br />
                Your classmates can post anything here
              </h3>
            </div>

            <div className="timetable__post">
              <div className="timetable__post--title">
                <img
                  src="https://genshin.honeyhunterworld.com/img/hutao_046.webp"
                  alt=""
                />
                <p>Hutao</p>
              </div>
              <h3>
                I'm the 77th Director of the Wangsheng Funeral Parlor, Hu Tao.
                Though by the looks of you... Radiant glow, healthy posture...
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timetable;
