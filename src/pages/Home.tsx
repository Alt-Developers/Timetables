import Header from "../components/Header";
import Glance from "../components/Glance";
import TimetableList from "../components/TimetableList";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import Covid from "../components/Covid";
import { useEffect, useState } from "react";
import { RootState } from "../context";

const Home = (props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.account.isAuthenticated
  );
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const classInfo = useSelector(
    (state: RootState) => state.timetable.classInfo
  );
  const config = useSelector(
    (state: RootState) => state.account.userInfo.config
  );
  const [fetchedUserInfo, setFetchedUserInfo] = useState(false);
  // console.log(classInfo);

  useEffect(() => {
    document.title = "Home | SS Timetables";
    if (localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme") ?? ""
      );
    }
  }, []);

  let timesFetched = 1;
  useEffect(() => {
    timesFetched++;
    if (timesFetched === 2) {
      setFetchedUserInfo(true);
    }
  }, [userInfo]);

  return (
    <>
      {isAuthenticated && (
        <motion.div
          exit={{ transform: " scale( 0.8)" }}
          transition={{ duration: 0.3 }}
        >
          <Header />
          <main>
            {fetchedUserInfo && <Glance />}
            {config?.showCovid === "covShow" && <Covid key="2" />}
            {classInfo.starredClass && <TimetableList key="3" />}
          </main>
        </motion.div>
      )}
    </>
  );
};

export default Home;
