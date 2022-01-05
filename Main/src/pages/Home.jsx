import Header from "../components/Header";
import Glance from "../components/Glance";
import TimetableList from "../components/TimetableList";

import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "../context/account";

const Home = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  return (
    <>
      {!isAuthenticated && (
        <button
          onClick={() => {
            dispatch(accountActions.login());
          }}>
          DEBUG: Login
        </button>
      )}
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
