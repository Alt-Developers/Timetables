import Modal from "react-modal";

import { useState } from "react";
import { activity } from "../models/TimetableTypes";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    zIndex: "50",
    background: "var(--light-2-translucent)",
    transition: "all .2s",
  },
  content: {
    zIndex: "50",
    width: "50vw",
    height: "60vh",
    backgroundColor: "var(--light-2)",
    border: "none",
    boxShadow: "0 0 3rem #00000010",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const Activity = () => {
  const [activity, setActivity] = useState<activity>({
    timetables: [
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
    highlightedPost: {},
  });
  const [addTimetableModal, setAddTimetableModal] = useState<boolean>(false);
  const [timelineProgress, setTimelineProgress] = useState(50);

  return (
    <>
      <Modal
        isOpen={addTimetableModal}
        style={modalStyles}
        onRequestClose={() => setAddTimetableModal(false)}
      >
        <h1>Hello</h1>
      </Modal>
      <div className="activity">
        <div className="activity__timeline activity__block">
          <div className="activity__timeline--left">
            <h1>
              <span className="accent">M.3/6</span>
              <br />
              Assumption College
            </h1>
            <div className="activity__timeline--mutual">
              <div className="activity__timeline--mutualAvatars">
                <img
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  alt=""
                />
                <img
                  src="https://media.istockphoto.com/photos/wild-grass-in-the-mountains-at-sunset-picture-id1322277517?k=20&m=1322277517&s=612x612&w=0&h=ZdxT3aGDGLsOAn3mILBS6FD7ARonKRHe_EKKa-V-Hws="
                  alt=""
                />
                <img
                  src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                  alt=""
                />
              </div>
              And 5 more classmates
            </div>
          </div>

          <motion.div
            className="activity__timeline--progressVl"
            initial={{ height: "0" }}
            animate={{ height: `${timelineProgress + 1}%` }}
            transition={{ ease: "easeIn", duration: ".6" }}
          ></motion.div>

          <div className="activity__timeline--vl">
            <motion.div
              className="activity__timeline--dot"
              initial={{
                height: "2rem",
                width: "2rem",
                top: "20%",
                opacity: 0,
              }}
              animate={{
                height: "2rem",
                width: "2rem",
                top: "20%",
                opacity: 1,
              }}
              transition={{ delay: 0.4, duration: 0.2 }}
            >
              <motion.div
                className="activity__timeline--dotContentRight activity__timeline--smallContent"
                initial={{ opacity: 0, y: "-2rem" }}
                animate={{ opacity: 1, y: "0rem" }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                English
              </motion.div>
              <motion.div
                className="activity__timeline--dotContentLeft activity__timeline--smallContent"
                initial={{ opacity: 0, y: "-2rem" }}
                animate={{ opacity: 1, y: "0rem" }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                9:00 AM
              </motion.div>
            </motion.div>
            <motion.div
              className="activity__timeline--dot"
              transition={{ delay: 0.6, duration: 0.3 }}
              initial={{
                height: "3rem",
                width: "3rem",
                left: "-2rem",
                top: `${timelineProgress}%`,
                opacity: 0,
              }}
              animate={{
                height: "3rem",
                width: "3rem",
                left: "-2rem",
                top: `${timelineProgress}%`,
                opacity: 1,
              }}
            >
              <motion.div
                className="activity__timeline--dotContentRight"
                initial={{ opacity: 0, y: "-2rem" }}
                animate={{ opacity: 1, y: "0rem" }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                Mathematics
              </motion.div>
              <motion.div
                className="activity__timeline--dotContentLeft"
                initial={{ opacity: 0, y: "-2rem" }}
                animate={{ opacity: 1, y: "0rem" }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                30 Minutes Elapsed
              </motion.div>
            </motion.div>
            <div
              className="activity__timeline--dot"
              style={{
                backgroundColor: "var(--dark-1)",
                height: "2rem",
                width: "2rem",
                top: "80%",
              }}
            >
              <div className="activity__timeline--dotContentRight activity__timeline--smallContent">
                Science
              </div>
              <div className="activity__timeline--dotContentLeft activity__timeline--smallContent">
                11:00 AM
              </div>
            </div>
          </div>
        </div>
        <div className="activity__boardHighlight activity__block">
          {/* <div className="activity__boardHighlight--title">
            <img
              src="https://pbs.twimg.com/profile_images/1509787105425526787/WdSeMffL_400x400.jpg"
              alt=""
            />
            <p>Hutao from Year 11A</p>
          </div>
          <h3>
            Welcome to the brand new Timetables. <br />A Fresh new start
          </h3> */}

          <div className="activity__boardHighlight--title">
            <img src="https://i.ibb.co/tsc83Cr/Frame-3.png" alt="" />
            <p>Alternate Assistance</p>
          </div>
          <h3>
            Welcome to your <span className="accent">Acitivity Board!</span>{" "}
            <br />
            Posts from your timetable will appear here
          </h3>
        </div>

        {activity.timetables.map((item, index) => {
          return (
            <Link
              to={`/timetable/${item.id}`}
              className="activity__block activity__class"
            >
              <h3>
                <span style={{ color: "var(--accent)" }}>
                  {item.className} <br />
                </span>
                {item.school}
              </h3>
              <p>{item.activity}</p>
            </Link>
          );
        })}

        <div
          className="activity__block activity__add"
          onClick={() => setAddTimetableModal(true)}
        >
          <i className="bx bx-message-square-add"></i>
          <p>Add another timetable to your collection</p>
        </div>
      </div>
    </>
  );
};

export default Activity;
