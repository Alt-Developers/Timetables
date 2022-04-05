import Header from "../components/Header";
import Glance from "../components/Glance";
import TimetableList from "../components/TimetableList";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import Covid from "../components/Covid";
import { useEffect, useState } from "react";

const Home = props => {
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const userInfo = useSelector(state => state.account.userInfo);
  const classInfo = useSelector(state => state.timetable.classInfo);
  const config = useSelector(state => state.account.config);
  const [fetchedUserInfo, setFetchedUserInfo] = useState(false);
  const testOrder = [
    ["Glance", fetchedUserInfo && <Glance key="1" />],
    [
      "Covid",
      classInfo.primaryClass && config.showCovid === "covShow" && (
        <Covid key="2" />
      ),
    ],
    ["TimetableList", classInfo.starredClass && <TimetableList key="3" />],
  ];
  console.log(classInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        <motion.div exit={{ scale: 0.8 }} transition={{ duration: 0.3 }}>
          <Header />
          <main>{testOrder.map(component => component[1])}</main>
        </motion.div>
      )}
    </>
  );
};

export default Home;
