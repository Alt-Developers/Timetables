import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../context";
import { motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router";
import SelectSearch from "react-select-search";
import { userInfo } from "os";

const OptionGroup = (props) => {
  const [isOpen, setIsOpen] = useState(props.isFirst ? true : false);
  const location = useLocation();
  const userInfo = useSelector((state: RootState) => state.account.userInfo);

  console.log(location);

  const optionGroupVariant = {
    open: {
      display: "flex",
      height: "fit-content",
    },
    closed: {
      display: "none",
      height: "0rem",
    },
  };

  return (
    <div className="sideNav__optionGroup">
      <div className="sideNav__optionGroup--top">
        <i className={`bx ${props.icon}`}></i>
        <h3>{props.name}</h3>
        <motion.i
          className="bx bx-chevron-right sideNav__optionGroup--chevron"
          animate={{ transform: `rotate(${isOpen ? "0deg" : "90deg"})` }}
          onClick={() => setIsOpen(!isOpen)}
        ></motion.i>
      </div>
      <motion.div
        className="sideNav__optionGroup--bottom"
        initial={{ height: "20rem" }}
        variants={optionGroupVariant}
        animate={isOpen ? "open" : "closed"}
      >
        {props.items.map((item) => {
          console.log(
            location.pathname + location.hash,
            `/developers${props.path}#${item.path}`
          );
          return (
            <Link
              style={
                location.pathname + location.hash ===
                `/developers${props.path}#${item.path}`
                  ? {
                      // backgroundColor: userInfo.color + "50",
                      color: userInfo.color,
                    }
                  : {}
              }
              to={`/developers${props.path}#${item.path}`}
            >
              {item.name}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

const DeveloperPanel = (props) => {
  const userInfo = useSelector((state: RootState) => state.account.userInfo);

  return (
    <>
      <nav className="topNav" style={{ backgroundColor: userInfo.color }}>
        <Link to="/developers">
          <h3>Timetables iAPI</h3>
        </Link>
        <div className="topNav__right">
          <img
            src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
            alt=""
          />
        </div>
      </nav>
      <section className="iAPI">
        <nav className="sideNav">
          {/* <div className="sideNav__alert">
            <div className="sideNav__alert--top">
              <h3>Warning!</h3>
            </div>
            <div className="sideNav__alert--bottom">
              <p>
                While your browsing in the timetables developers iAPI your IP
                adress will be recorded.
              </p>
            </div>
          </div> */}

          <OptionGroup
            name="Holidays"
            icon="bxs-calendar"
            path="/holidays"
            items={[{ name: "New Holiday", path: "newHoliday" }]}
            isFirst
          />
        </nav>
        <div className="iAPI__main">
          <Routes>
            <Route
              path="/holidays"
              element={
                <>
                  <NewHoliday />
                </>
              }
            />
            <Route
              path="*"
              element={
                <section className="iAPI__landing">
                  <h1>Welcome to the Timetables iAPI</h1>
                  <p>Select the service from the sidebar</p>
                  {/* <div className="bar"></div> */}
                </section>
              }
            />
          </Routes>
        </div>
      </section>
    </>
  );
};

const NewHoliday = (props) => {
  const [isThai, setIsThai] = useState(false);
  const [type, setType] = useState("public");
  const [engHeader, setEngHeader] = useState("");
  const [thaiHeader, setThaiHeader] = useState("");
  const [engDesc, setEngDesc] = useState("");
  const [thaiDesc, setThaiDesc] = useState("");

  const userInfo = useSelector((state: RootState) => state.account.userInfo);

  return (
    <>
      <h1 className="bar__header">New Holiday</h1>
      <div className="bar newHoliday">
        <div className="newHoliday__top">
          <div className="langSelect">
            <button
              className={`langSelect--left`}
              onClick={() => setIsThai(false)}
              style={
                isThai
                  ? {}
                  : {
                      backgroundColor: userInfo.color,
                      color: "#fff",
                      border: `1px solid ${userInfo.color}`,
                    }
              }
            >
              English
            </button>
            <button
              onClick={() => setIsThai(true)}
              style={
                isThai
                  ? {
                      backgroundColor: userInfo.color,
                      color: "#fff",
                      border: `1px solid ${userInfo.color}`,
                    }
                  : {}
              }
              className={`langSelect--right`}
            >
              Thai
            </button>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
            {type === "specific" && (
              <SelectSearch
                className={"select2"}
                options={[
                  { name: "Assumption College", value: "ASSUMPTION" },
                  { name: "The Newton", value: "NEWTON" },
                  { name: "The Essence", value: "ESSENCE" },
                  {
                    name: "Assumption College Thonburi",
                    value: "ASSUMPTION_THON",
                  },
                ]}
              />
            )}
            <SelectSearch
              className={"select2"}
              value={type}
              // @ts-ignore
              onChange={setType}
              options={[
                { name: "Public", value: "public" },
                { name: "Specific", value: "specific" },
              ]}
            />

            <input type="date" className="newHoliday__date" />
          </div>
        </div>

        <div className="newHoliday__middle">
          <input
            className="newHoliday__headerInput"
            placeholder={isThai ? "Thai Header" : "English Header"}
            type="text"
            value={isThai ? thaiHeader : engHeader}
            onChange={(event) => {
              isThai
                ? setThaiHeader(event.target.value)
                : setEngHeader(event.target.value);
            }}
          />
          <textarea
            className="newHoliday__descInput"
            placeholder={isThai ? "Thai Description" : "English Description"}
            value={isThai ? thaiDesc : engDesc}
            onChange={(event) => {
              isThai
                ? setThaiDesc(event.target.value)
                : setEngDesc(event.target.value);
            }}
          />
          <div className="newHoliday__imgInput">
            <p>image uploading coming soon</p>
          </div>
        </div>

        <div className="newHoliday__bottom">
          <div className="newHoliday__simplifiedDate">
            <p>Simplified Date</p>
            <div className="newHoliday__simplifiedDate">aa</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperPanel;
