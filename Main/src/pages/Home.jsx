import Header from "../components/Header";
import Glance from "../components/Glance";
import TimetableList from "../components/TimetableList";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../components/Loading";
import Covid from "../components/Covid";
import { useEffect, useState } from "react";

const Home = props => {
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const userInfo = useSelector(state => state.account.userInfo);
  const config = useSelector(state => state.account.config);
  const [fetchedUserInfo, setFetchedUserInfo] = useState(false);
  const testOrder = [
    ["Glance", fetchedUserInfo && <Glance />],
    [
      "Covid",
      userInfo.primaryClass && config.showCovid === "covShow" && <Covid />,
    ],
    ["TimetableList", userInfo.primaryClass && <TimetableList />],
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let timesFetched = 1;
  useEffect(() => {
    timesFetched++;
    console.log(timesFetched);
    if (timesFetched === 2) {
      setFetchedUserInfo(true);
    }
  }, [userInfo]);

  return (
    <AnimatePresence>
      {isAuthenticated && (
        <motion.div exit={{ scale: 0.8 }} transition={{ duration: 0.3 }}>
          <Header />
          <main>
            {/* <button onClick={() => setTestOrder(testOrder.move(0, 1))}>
              Move
            </button> */}
            {testOrder.map(component => component[1])}
          </main>
        </motion.div>
      )}
      {!isAuthenticated && <Loading />}
    </AnimatePresence>
  );
};

export default Home;
