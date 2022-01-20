import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = props => {
  const userInfo = useSelector(state => state.account.userInfo);
  const language = useSelector(state => state.account.language);

  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  useEffect(() => {
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

  return (
    <div className="header" style={{ backgroundColor: userInfo.color }}>
      {!props.text ? (
        <h1>
          {language === "EN" ? "It's currently" : "ขณะนี้เวลา"} <br />
          {clock}
        </h1>
      ) : (
        props.text
      )}
      <div className="header__account">
        {language === "EN" ? (
          <h3>
            {`${userInfo.firstName} ${userInfo.lastName}'s`} <br />
            SS Account
          </h3>
        ) : (
          <h3>
            SS Account ของ
            <br />
            {`${userInfo.firstName} ${userInfo.lastName}`}
          </h3>
        )}
        <div className="header__userProfile">
          <Link to={`${props.clickProfile === "home" ? "/" : "/preferences"}`}>
            <span>
              <i
                className={`bx ${
                  props.clickProfile === "home" ? "bx-home-alt" : "bx-slider"
                }`}></i>
            </span>
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
              alt="user profile picture"
              height="150"
              width="150"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
