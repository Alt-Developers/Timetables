import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { period, timetable } from "../models/TimetableTypes";
import TimetableDay from "../components/TimetableDay";

const Timetable = () => {
  const { timetableId } = useParams();
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
          <Link to="/preferences">
            <i className="bx bx-sun"></i>
          </Link>
          <Link to="/preferences">
            <i className="bx bx-link"></i>
          </Link>
        </div>
      </div>

      <div className="timetable__top">
        <h1 className="timetable__title">
          M 3/6 <span>12th June, 13:25</span>
        </h1>
        <div className="timetable__chips">
          <div className="timetable__chip">Board</div>
          <div className="timetable__chip timetable__activeChip">Timetable</div>
        </div>
      </div>

      <div className="timetable__table">
        <div className="block"></div>
        <div
          className="block timeLayout"
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
      </div>
    </section>
  );
};

export default Timetable;
