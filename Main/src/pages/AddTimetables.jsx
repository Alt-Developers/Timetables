import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import TimetableItem from "../components/TimetableItem";
import Header from "../components/Header";
import AddTimetableItem from "../components/AddTimetableItem";
import { useEffect } from "react";
import Switch from "react-switch";
import { accountActions } from "../context/accountSlice";

const AddTimetables = props => {
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header
        text={
          <h1>
            Timetable
            <br />
            Preferences
          </h1>
        }
        clickProfile={"home"}
      />
      <section className="removeTimetables">
        <h1 className="bar__header">Add Timetables</h1>
        <div className="row box">
          {userInfo.primaryClass && (
            <AddTimetableItem
              header={"Add new Classes"}
              button={"Add"}
              placeholder={"Search for timetables"}
              isPrimary={false}
            />
          )}
          {userInfo.primaryClass ? (
            <AddTimetableItem
              header={"Change My Class"}
              button={"Change"}
              placeholder={"Search for timetables"}
              defaultOption={userInfo.primaryClass.classNo}
              isPrimary={true}
            />
          ) : (
            <AddTimetableItem
              header={"Set My Class"}
              button={"Set"}
              placeholder={"Search for timetables"}
              isPrimary={true}
            />
          )}
        </div>

        {userInfo.primaryClass && (
          <>
            <h1 className="bar__header">Remove Timetables</h1>
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="bar timetable">
              {userInfo.primaryClass && (
                <TimetableItem
                  color={userInfo.primaryClass.color}
                  text={"My Class"}
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
          </>
        )}
      </section>
      <section className="config">
        {/* <h1 className="bar__header">Configurations</h1> */}
        <div className="config__bar">
          <div className="config__container">
            {/* <div className="config__item">
              <h3>Hidden Period Time</h3>
              <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={userInfo.color}
                className="config__switch"
              />
            </div>
            <div className="config__item">
              <h3>24hr Time</h3>
              <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={userInfo.color}
                className="config__switch"
              />
            </div>
            <div className="config__item">
              <h3>Covid-19 Reports</h3>
              <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                onColor={userInfo.color}
                className="config__switch"
              />
            </div> */}
          </div>
          <button
            className="config__logout"
            style={{ width: "100%" }}
            onClick={() => {
              dispatch(accountActions.logout());
            }}>
            <i class="bx bx-log-out"></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default AddTimetables;
