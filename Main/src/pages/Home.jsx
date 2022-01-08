import Header from "../components/Header";
import Glance from "../components/Glance";
import TimetableList from "../components/TimetableList";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../components/Loading";

const Home = props => {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  return (
    <AnimatePresence>
      {isAuthenticated && (
        <motion.div exit={{ scale: 0.8 }} transition={{ duration: 0.3 }}>
          <Header />
          <main>
            <Glance />
            <TimetableList />
          </main>
        </motion.div>
      )}
      {!isAuthenticated && <Loading />}
    </AnimatePresence>
  );
};

export default Home;
