import Header from "../components/Header";
import { useState } from "react";

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
              Welcome to the brand new Timetables. A Fresh new start
              oasidjoaisdjsoidjsoadjsodjs
            </h3>
          </div>

          {activity.classes.map((item, index) => {
            return (
              <div className="activity__block activity__class">
                <h3>
                  <span style={{ color: colorSequence[index] }}>
                    {item.className} <br />
                  </span>
                  {item.school}
                </h3>
                <p>{item.activity}</p>
              </div>
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
