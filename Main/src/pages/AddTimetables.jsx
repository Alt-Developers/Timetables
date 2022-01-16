import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import TimetableItem from "../components/TimetableItem";
import Header from "../components/Header";
import AddTimetableItem from "../components/AddTimetableItem";
import { useEffect } from "react";

const AddTimetables = props => {
  const userInfo = useSelector(state => state.account.userInfo);

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
          <AddTimetableItem
            header={"Add new Classes"}
            button={"Add"}
            placeholder={"Search for timetables"}
            isPrimary={false}
          />
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
                  />
                ))}
            </motion.section>
          </>
        )}
      </section>
    </>
  );
};

export default AddTimetables;
