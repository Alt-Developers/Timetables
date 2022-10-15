import Header from "../components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const colorSequence = [
    "#fd5252",
    "#F98A3A",
    "#FFCA62",
    "#92EA9B",
    "#4D90FF",
    "#fd5252",
    "#F98A3A",
    "#FFCA62",
    "#92EA9B",
    "#4D90FF",
    "#fd5252",
    "#F98A3A",
    "#FFCA62",
    "#92EA9B",
    "#4D90FF",
    "#fd5252",
    "#F98A3A",
    "#FFCA62",
    "#92EA9B",
    "#4D90FF",
  ];
  const [activity, setActivity] = useState({
    classes: [
      {
        id: "d93jn8e3dwkw9mdiw",
        className: "Year 11A",
        school: "Newton",
        activity: "Kazuha just posted something",
      },
      {
        id: "d93jn8e3dwkw9mdiw",
        className: "Year 10B",
        school: "Newton",
        activity: "Keqing just joined the class",
      },
      {
        id: "d93jn8e3dwkw9mdiw",
        className: "M 3A",
        school: "Essence",
        activity: "Klee just posted something",
      },
      {
        id: "d93jn8e3dwkw9mdiw",
        className: "M 1C",
        school: "Essence",
        activity: "Jean just updated the timetable",
      },
      {
        id: "d93jn8e3dwkw9mdiw",
        className: "Year 6A",
        school: "Newton Primary",
        activity: "Childe just posted something",
      },
      {
        id: "d93jn8e3dwkw9mdiw",
        className: "P 5A",
        school: "Essence Primary",
        activity: "Sayu just posted something",
      },
    ],
  });
  // const timelinePhaseClasses = {
  //   passed: {
  //     backgroundColor: "#fd5252",
  //     height: "2rem",
  //     width: "2rem",
  //   },
  //   current: {
  //     backgroundColor: "#fd5252",
  //     height: "4rem",
  //     width: "4rem",
  //   },
  //   soon: {
  //     backgroundColor: "var(--dark-1)",
  //     height: "2rem",
  //     width: "2rem",
  //   },
  // };

  return (
    <section className="home">
      <Header />
      <div className="home__content">
        <h3 className="activity__header">Activity Board</h3>
        <div className="activity">
          <div className="activity__timeline activity__block">
            <h1>
              <span className="accent">M.3/6</span>
              <br />
              Assumption <br />
              College.
            </h1>

            <div
              className="activity__timeline--progressVl"
              style={{ height: "50%" }}
            ></div>

            <div className="activity__timeline--vl">
              <div
                className="activity__timeline--dot"
                style={{
                  backgroundColor: "#fd5252",
                  height: "2rem",
                  width: "2rem",
                  top: "25%",
                }}
              >
                <div className="activity__timeline--dotContentRight">
                  English
                </div>
                <div className="activity__timeline--dotContentLeft">
                  9:00 AM
                </div>
              </div>
              <div
                className="activity__timeline--dot"
                style={{
                  backgroundColor: "#fd5252",
                  height: "3rem",
                  width: "3rem",
                  left: "-2rem",
                  top: "50%",
                }}
              >
                <div className="activity__timeline--dotContentRight">
                  Mathematics
                </div>
                <div className="activity__timeline--dotContentLeft">
                  15 Minutes Elapsed
                </div>
              </div>
              <div
                className="activity__timeline--dot"
                style={{
                  backgroundColor: "var(--dark-1)",
                  height: "2rem",
                  width: "2rem",
                  top: "75%",
                }}
              ></div>
            </div>
          </div>
          <div className="activity__boardHighlight activity__block">
            <div className="activity__boardHighlight--title">
              <img
                src="https://pbs.twimg.com/profile_images/1509787105425526787/WdSeMffL_400x400.jpg"
                alt=""
              />
              <p>Hutao from Year 11A</p>
            </div>
            <h3>
              Welcome to the brand new Timetables. <br />A Fresh new start
            </h3>
          </div>

          {activity.classes.map((item, index) => {
            return (
              <Link
                to={`/timetable/${item.id}`}
                className="activity__block activity__class"
              >
                <h3>
                  <span style={{ color: colorSequence[index] }}>
                    {item.className} <br />
                  </span>
                  {item.school}
                </h3>
                <p>{item.activity}</p>
              </Link>
            );
          })}

          <div className="activity__block activity__add">
            <i className="bx bx-message-square-add"></i>
            <p>Add another class to your collection</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
