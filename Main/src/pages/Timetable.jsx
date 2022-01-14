import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Timetable = props => {
  // const { timetableID: params } = useParams();
  const [hoverMon, setHoverMon] = useState(false);
  const [hoverTue, setHoverTue] = useState(false);
  const [hoverWed, setHoverWed] = useState(false);
  const [hoverThu, setHoverThu] = useState(false);
  const [hoverFri, setHoverFri] = useState(false);
  const [periodTime, setPeriodTime] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const userInfo = useSelector(state => state.account.userInfo);

  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  useEffect(() => {
    // fetch(
    //   `https://apis.ssdevelopers.xyz/timetables/getTimetables?classNo=${searchParams.get(
    //     "class"
    //   )}&program=${searchParams.get("program")}`
    // )
    //   .then(data => data.json())
    //   .then(data => {
    //     console.log(data);
    //   });

    window.scrollTo(0, 0);
    setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      date.getSeconds() === 0 && setClock(formatedDate);
    }, [1000]);
  }, []);

  const monBlurred =
    (hoverTue || hoverWed || hoverThu || hoverFri) && "blurred";
  const tueBlurred =
    (hoverMon || hoverWed || hoverThu || hoverFri) && "blurred";
  const wedBlurred =
    (hoverMon || hoverTue || hoverThu || hoverFri) && "blurred";
  const thuBlurred =
    (hoverTue || hoverWed || hoverMon || hoverFri) && "blurred";
  const friBlurred =
    (hoverTue || hoverWed || hoverThu || hoverMon) && "blurred";

  const searchHandler = event => {
    console.log(event.target.value);
  };

  return (
    <>
      <section
        className="timetableNav"
        style={{ backgroundColor: userInfo.color }}>
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
      <section className="timetableBar">
        <div className="timetableBar__text">
          <p>Timetable:</p>
          <h1>
            {searchParams.get("class")}{" "}
            <span className="hiddenOnPhone">Timetable</span>
          </h1>
        </div>
        <div className="timetableBar__text timetableBar__time">
          <p>Time:</p>
          <h1>{clock}</h1>
        </div>
        {/* <div className="timetableBar__text">
          <p>Next Period:</p>
          <h1>Ocupational Works</h1>
        </div> */}
        <div className="timetableBar__input">
          <input
            onChange={searchHandler}
            type="text"
            style={{
              backgroundColor: userInfo.color + "50",
            }}
            placeholder="Search Here"
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
        <div
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

          <div
            className={`t-r1c1 weekdays ${monBlurred}`}
            onMouseEnter={() => {
              setHoverMon(true);
            }}
            onMouseLeave={() => {
              setHoverMon(false);
            }}>
            Monday
          </div>

          <div className={`t-r1c2 periods__morning ${monBlurred}`}>
            <h3 className={``}>Science E.</h3>
            <h3 className={`learning`}>History</h3>
            <h3>Computers</h3>
          </div>
          <div
            className="t-r1c3"
            style={
              periodTime ? { gridColumn: "3 /  4", gridRow: "2 / span 5" } : {}
            }>
            <h3>Lunch Break</h3>
          </div>
          <div className={`t-r1c4 periods__afternoon ${monBlurred}`}>
            <h3>Science E.</h3>
            <h3>History</h3>
            <h3>Computers</h3>
            <h3>Computers</h3>
          </div>

          <div
            className={`t-r2c1 weekdays ${tueBlurred}`}
            onMouseEnter={() => {
              setHoverTue(true);
            }}
            onMouseLeave={() => {
              setHoverTue(false);
            }}>
            Tuesday
          </div>
          <div className={`t-r2c2 periods__morning ${tueBlurred}`}>7</div>
          <div className={`t-r2c4 periods__afternoon ${tueBlurred}`}>9</div>

          <div
            className={`t-r3c1 weekdays ${wedBlurred}`}
            onMouseEnter={() => {
              setHoverWed(true);
            }}
            onMouseLeave={() => {
              setHoverWed(false);
            }}>
            Wednesday
          </div>
          <div className={`t-r3c2 periods__morning ${wedBlurred}`}>12</div>
          <div className={`t-r3c4 periods__afternoon ${wedBlurred}`}>14</div>

          <div
            className={`t-r4c1 weekdays ${thuBlurred}`}
            onMouseEnter={() => {
              setHoverThu(true);
            }}
            onMouseLeave={() => {
              setHoverThu(false);
            }}>
            Thursday
          </div>
          <div className={`t-r4c2 periods__morning ${thuBlurred}`}>17</div>
          <div className={`t-r4c4 periods__afternoon ${thuBlurred}`}>19</div>

          <div
            className={`t-r5c1 weekdays ${friBlurred}`}
            onMouseEnter={() => {
              setHoverFri(true);
            }}
            onMouseLeave={() => {
              setHoverFri(false);
            }}>
            Friday
          </div>
          <div className={`t-r5c2 periods__morning ${friBlurred}`}>22</div>
          <div className={`t-r5c4 periods__afternoon ${friBlurred}`}>24</div>
        </div>
      </section>
    </>
  );
};

export default Timetable;
