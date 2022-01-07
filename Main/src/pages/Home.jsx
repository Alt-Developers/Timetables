import Header from "../components/Header";
import Glance from "../components/Glance";
import TimetableList from "../components/TimetableList";

import { useSelector } from "react-redux";

const Home = props => {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated && (
        <>
          <Header />
          <main>
            <Glance />
            <TimetableList />
          </main>
        </>
      )}
    </>
  );
};

export default Home;
