import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import TimetableItem from "../components/TimetableItem";
import Header from "../components/Header";
import AddTimetableItem from "../components/AddTimetableItem";
import { useEffect } from "react";
import { accountActions } from "../context/accountSlice";
import SelectSearch from "react-select-search";
import { useState } from "react";
import { refetchActions } from "../context/refetchSlice";

const AddTimetables = props => {
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();
  const language = useSelector(state => state.account.language);

  const [selectedLanguage, setSelectedLanguage] = useState(
    userInfo.config.language
  );
  const [selectedDateFormat, setSelectedDateFormat] = useState(
    userInfo.config.dateTime
  );
  const [selectedCovid, setSelectedCovid] = useState(userInfo.config.showCovid);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(accountActions.setLanguage(selectedLanguage));
  }, [selectedLanguage]);
  useEffect(() => {
    dispatch(
      accountActions.setConfig({
        dateTime: selectedDateFormat,
        showCovid: selectedCovid,
      })
    );
    dispatch(refetchActions.refetch());
  }, [selectedDateFormat, selectedCovid]);

  useEffect(() => {
    console.log(selectedLanguage, selectedCovid, selectedDateFormat);
    fetch("https://apis.ssdevelopers.xyz/auth/editConfig", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        language: selectedLanguage,
        showCovid: selectedCovid,
        dateTime: selectedDateFormat,
      }),
    }).then(data => console.log(data.json()));
  }, [selectedLanguage, selectedCovid, selectedDateFormat]);

  return (
    <>
      <Header
        text={
          <h1>
            {language === "EN" ? "Timetable" : "การตั้งค่า"}
            <br />
            {language === "EN" ? "Preferences" : "Timetables"}
          </h1>
        }
        clickProfile={"home"}
      />
      {userInfo.primaryClass && (
        <section className="config">
          <h1 className="bar__header">
            {language === "EN" ? "Configurations" : "ตั้งค่า"}
          </h1>
          <div className="config__bar">
            <div className="config__item">
              <h3>{language === "EN" ? "Language" : "ภาษา / Language"}</h3>
              <SelectSearch
                width="100%"
                options={[
                  { value: "EN", name: "English" },
                  { value: "TH", name: "ไทย" },
                ]}
                onChange={setSelectedLanguage}
                value={selectedLanguage}
              />
            </div>
            <div className="config__item">
              <h3>{language === "EN" ? "Time Format" : "รูปแบบเวลา"}</h3>
              <SelectSearch
                width="100%"
                options={[
                  { value: "24h", name: "24 hours" },
                  { value: "12h", name: "12 hours" },
                ]}
                onChange={setSelectedDateFormat}
                value={selectedDateFormat}
              />
            </div>
            <div className="config__item">
              <h3>
                {language === "EN"
                  ? "Covid Reports"
                  : "แสดงค่าการติดเชื้อโควิด-19"}
              </h3>
              <SelectSearch
                width="100%"
                options={[
                  { value: "covShow", name: "Show" },
                  { value: "covHide", name: "Hidden" },
                ]}
                onChange={setSelectedCovid}
                value={selectedCovid}
              />
            </div>
            <button
              className="config__logout"
              onClick={() => {
                dispatch(accountActions.logout());
              }}>
              <p className="hiddenOnPC">Logout</p>
              <i className="bx bx-log-out hiddenOnPhone"></i>
            </button>
          </div>
        </section>
      )}
      <section className="removeTimetables">
        <h1 className="bar__header">
          {language === "EN" ? "Add Timetables" : "เพิ่มตารางสอน"}
        </h1>
        <div className="row">
          {userInfo.primaryClass && (
            <AddTimetableItem
              header={language === "EN" ? "Add new Classes" : "เพิ่มตารางสอน"}
              button={language === "EN" ? "Add" : "เพิ่ม"}
              placeholder={
                language === "EN" ? "Search for timetables" : "ค้นหาห้อง"
              }
              isPrimary={false}
            />
          )}
          {userInfo.primaryClass ? (
            <AddTimetableItem
              header={
                language === "EN" ? "Change My Class" : "เปลี่ยนห้องของฉัน"
              }
              button={language === "EN" ? "Change" : "เปลี่ยน"}
              placeholder={
                language === "EN" ? "Search for timetables" : "ค้นหาห้อง"
              }
              defaultOption={userInfo.primaryClass.classNo}
              isPrimary={true}
              style={{ marginBottom: "2rem" }}
            />
          ) : (
            <AddTimetableItem
              header={language === "EN" ? "Set My Class" : "ห้องของฉันคือ"}
              button={language === "EN" ? "Set" : "ตั้งห้องนี้เป็นห้องของฉัน"}
              placeholder={
                language === "EN" ? "Search for timetables" : "ค้นหาห้อง"
              }
              isPrimary={true}
              isNewUser={true}
              style={{ marginBottom: "2rem" }}
            />
          )}
        </div>

        {userInfo.primaryClass && (
          <>
            <h1 className="bar__header">
              {language === "EN" ? "Remove Timetables" : "เอาตารางสอนออก"}
            </h1>
            <div className="box">
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="bar timetable">
                {userInfo.primaryClass && (
                  <TimetableItem
                    color={userInfo.primaryClass.color}
                    text={language === "EN" ? "My Class" : "ห้องของฉัน"}
                    disabled={true}
                    subText={userInfo.primaryClass.className}
                    classNo={userInfo.primaryClass.classNo}
                    program={userInfo.primaryClass.program}
                  />
                )}
                {userInfo.starredClasses &&
                  userInfo.starredClasses.map(element => (
                    <TimetableItem
                      style={{ width: 300 }}
                      key={Math.random}
                      color={element.color}
                      text={element.className}
                      remove={true}
                      classNo={element.classNo}
                      program={element.program}
                    />
                  ))}
              </motion.section>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AddTimetables;
