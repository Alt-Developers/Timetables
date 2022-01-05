import "./sass/main.css";
import Header from "./components/Header";
import Glance from "./components/Glance";
import TimetableList from "./components/TimetableList";

function App() {
  return (
    <>
      <section className="page__home">
        <Header />
        <main>
          <Glance />
          <TimetableList />
        </main>
      </section>
    </>
  );
}

export default App;
