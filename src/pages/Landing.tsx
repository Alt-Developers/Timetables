import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { useEffect } from "react";

const Landing = props => {
  const [isThai, setIsThai] = useState(false);
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const lang = (eng, thai) => {
    if (isThai) return eng;
    return thai;
  };

  useEffect(() => {
    if (navigator.language === "th") {
      setIsThai(true);
    } else {
      setIsThai(false);
    }
  }, []);

  return (
    <section className={`landing`}>
      <div className="landing__nav">
        <h2>
          Timetables <span>by SS Developers</span>
        </h2>
        <button
          onClick={() => {
            setIsThai(!isThai);
            document.cookie = `ssLanguage=${isThai ? "th" : "en"}`;
          }}>
          {isThai ? "TH" : "EN"}
        </button>
      </div>

      <div className="landing__header">
        <div className="landing__text">
          <h1 style={isThai ? {} : { lineHeight: "7rem", marginTop: "-1rem" }}>
            {lang("Next level", "ตารางเรียน")}
            <br />
            {lang("of Timetables", "ที่เหนือกว่าใครๆ")}
          </h1>
          <h3>{lang("Timetables v3 is here", "Timetables v3 มาแล้ว")}</h3>
        </div>

        <img
          src={
            isDarkMode
              ? "./icons/darkLandingPreview.png"
              : "./icons/lightLandingPreview.png"
          }
          alt=""
        />

        <div className="landing__buttons">
          {!localStorage.getItem("token") ? (
            <a href="https://authentication.ssdevelopers.xyz/login/timetables">
              <button>{lang("Login", "เข้าสู่ระบบ")}</button>
            </a>
          ) : (
            <Link to="/">
              <button>{lang("Login", "เข้าสู่ระบบ")}</button>
            </Link>
          )}
          <a
            href="https://authentication.ssdevelopers.xyz/signup/timetables"
            style={{ marginLeft: "2rem" }}>
            {lang("Signup", "ลงทะเบียน")}
          </a>
        </div>
      </div>

      <div className="landing__main">
        <div className="landing__boxCon">
          <div className={`landing__boxRight ${isThai ? "" : "landing__thai"}`}>
            <h3>
              {isThai ? "Timetables is" : "Timetable นั้น"}
              <br />
              <span className="landing__boxRight--1">
                {isThai ? "Simple" : "เรียบง่าย"}
              </span>
              <br />
              <span className="landing__boxRight--2">
                {isThai ? "Customizable" : "ปรับแต่งได้"}
              </span>
              <br />
              <span className="landing__boxRight--3">
                {isThai ? "and Practical" : "ใช้ได้จริง "}
              </span>
            </h3>
          </div>
          <div className="landing__boxLeft">
            <h3>{lang("Whats new in v3", "มีอะไรใหม่บ้างใน v3")}</h3>
            <p>
              - Multiple school support
              <br />
              - Smoother animations <br />
              - Performance upgrades <br />- Easy settings access
            </p>
          </div>
        </div>

        <div className="glancePreview">
          <div className={`glancePreview__textCon`}>
            <h1>
              {lang(
                'It all starts "At a Glance"',
                'มันเริ่มต้นที่ "At a Glance"'
              )}
            </h1>
            <p>
              {lang(
                "Designed to eliminate the process of going in to the actual timetable.",
                "เกิดมาเพื่อลบล้างเหตุผลในการเข้าไปดูตารางเรียนเต็ม"
              )}
            </p>
          </div>
          <div className="glancePreview__bar">
            <section className="bar">
              <div
                className="bar__item bsmall"
                style={{ background: "#69ACEA" }}>
                <h3>
                  Current Period: <br />
                  Maths
                </h3>
                <button className="btn bar__item--btn">
                  View in timetables
                </button>
                <img
                  src="./icons/MAT.png"
                  className="bar__icon"
                  height="150"
                  alt=""
                />
              </div>
              <div
                className="bar__item bsmall"
                style={{ background: "#70F094" }}>
                <h3>
                  Next Period: <br />
                  Physics
                </h3>
                <button className="btn bar__item--btn">
                  View in timetables
                </button>
                <img
                  src="./icons/PHY.png"
                  className="bar__icon"
                  height="150"
                  alt=""
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
