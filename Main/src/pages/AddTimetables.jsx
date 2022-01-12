import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import TimetableItem from "../components/TimetableItem";
import Header from "../components/Header";
import AddTimetableItem from "../components/AddTimetableItem";

const AddTimetables = props => {
  const userInfo = useSelector(state => state.account.userInfo);
  const dispatch = useDispatch();

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
      />
      <section className="removeTimetables">
        <h1 className="bar__header">Add Timetables</h1>

        <div className="row box">
          <AddTimetableItem
            header={"Add new Classes"}
            button={"Add"}
            placeholder={"Search for timetables"}
          />
          <AddTimetableItem
            header={"Change My Class"}
            button={"Change"}
            placeholder={"Search for timetables"}
            defaultOption={userInfo.primaryClass.classNo}
          />
        </div>

        <h1 className="bar__header">Remove Timetables</h1>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="bar timetable">
          <TimetableItem
            color={userInfo.primaryClass.color}
            text={"My Class"}
            disabled={true}
            subText={userInfo.primaryClass.className}
          />
          {userInfo.starredClasses.map(element => (
            <TimetableItem
              style={{ width: 300 }}
              key={Math.random}
              color={element.color}
              text={element.className}
              remove={true}
            />
          ))}
        </motion.section>
      </section>
    </>
  );
};

export default AddTimetables;
