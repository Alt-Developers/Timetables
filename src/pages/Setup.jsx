import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddTimetableItem from "../components/AddTimetableItem";
import { accountActions } from "../context/accountSlice";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Setup = props => {
  const { token: params } = useParams();
  const language = useSelector(state => state.account.language);
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", params.replace(":", ""));

    fetch("https://apis.ssdevelopers.xyz/auth/getUser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(data => {
        if (data.status === 200) return data.json();
        if (data.status === 500) return;
      })
      .then(data => {
        dispatch(accountActions.login(data));
        dispatch(accountActions.setLanguage(data.config.language));
        dispatch(
          accountActions.setConfig({
            dateTime: data.config.dateTime,
            showCovid: data.config.showCovid,
          })
        );
      });
  }, []);

  return (
    <section className="setup">
      <motion.div
        className="setup__left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "ease-in" }}>
        <div className="setup__textCon" style={{ background: userInfo.color }}>
          <h1>
            {language === "EN"
              ? "Welcome to Timetables"
              : "ยินดีต้อนรับเข้าสู่ Timetables"}
          </h1>
          <p>
            {language === "EN"
              ? "We'll first need to set you up"
              : "เราต้องขอทำการตั้งค่าแอคเค้าวทคุณ"}
          </p>
        </div>

        <div className="setup__preview">
          <div className="setup__imgCon" style={{ background: userInfo.color }}>
            <img
              src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
              alt="user profile picture"
            />
          </div>
          <div className="setup__nameCon">
            <h4>
              {userInfo.firstName} {userInfo.lastName}
            </h4>
            <p>{userInfo.email}</p>
          </div>
          <div className="setup__infoCon">
            <h4>Info:</h4>
            <p>Studies At: The Newton</p>
            <p>Class: Year-10 A</p>
          </div>
        </div>
      </motion.div>
      <div className="setup__right">
        <h3>
          {language === "EN" ? "What class are you in?" : "คุณอยู่ห้องอะไร"}
        </h3>
        {userInfo && (
          <AddTimetableItem
            header={language === "EN" ? "Class" : "ห้องของฉันคือ"}
            header2={language === "EN" ? "School" : "โรงเรียนฉันคือ"}
            placeholder2={
              language === "EN" ? "Search for schools" : "ค้นหาโรงเรียน"
            }
            button={
              language === "EN"
                ? "Make this my class"
                : "ตั้งห้องนี้เป็นห้องของฉัน"
            }
            placeholder={
              language === "EN" ? "Search for timetables" : "ค้นหาห้อง"
            }
            isPrimary={true}
            isNewUser={true}
            style={{
              marginTop: "2rem",
              width: "100%",
              marginBottom: "0rem",
              filter: "none",
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Setup;
