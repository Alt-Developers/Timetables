import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../context";

const Header = (props) => {
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const language = useSelector((state: RootState) => state.account.language);
  const dateTime = useSelector(
    (state: RootState) => state.account?.userInfo?.config?.dateTime
  );
  const location = useLocation();

  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hourCycle: dateTime === "12h" ? "h12" : "h23",
    })
  );

  useEffect(() => {
    let intervalId = setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
        hour12: dateTime === "12h" ? true : false,
      });
      date.getSeconds() === 0 && setClock(formatedDate);
      // @ts-ignore
    }, [1000]);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="header"
      style={{
        background:
          userInfo.type === "developer"
            ? `linear-gradient(27deg, ${userInfo.color} 0%, ${
                userInfo.color + "60"
              } 100%)`
            : userInfo.color,
      }}
    >
      {!props.text ? (
        <h1>
          {language === "EN" ? "It's currently" : "ขณะนี้เวลา"} <br />
          {clock}{" "}
          {dateTime === "12h" ? "" : language === "EN" ? "O'Clock" : "นาฬิกา"}
        </h1>
      ) : (
        props.text
      )}
      <div className="header__account">
        {language === "EN" ? (
          <h3>
            {`${userInfo.firstName} ${userInfo.lastName}'s`} <br />
            {userInfo.type === "developer"
              ? "SS Developer Account"
              : "SS Account"}
          </h3>
        ) : (
          <h3>
            {userInfo.type === "developer"
              ? "SS Developer Account ของ"
              : "SS Account ของ"}
            <br />
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </h3>
        )}
        <div className="header__userProfile">
          <motion.img
            src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
            alt="user profile picture"
            height="150"
            width="150"
          />

          <Link
            title="Switch between Home and Preferences"
            to={`${props.clickProfile === "home" ? "/" : "/preferences"}`}
          >
            {location.pathname === "/" ? (
              <i className={`bx bxs-cog header__icon`}></i>
            ) : (
              <i className="bx bxs-home header__homeIcon"></i>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
