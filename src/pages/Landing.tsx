import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="main__landing">
      <nav className="navigation">
        <div className="navigation__logo">
          <img src="./logo.png" alt="logo" />
          Timetables
        </div>
        <div className="navigation__links">
          <Link to="/explore">Explore</Link>
          <a className="navigation__links--getStarted" href="">
            Get Started
          </a>
        </div>
      </nav>
      <div className="landing__header">
        <div className="landing__header--text">
          <h1>
            Next <br /> Generation <br /> of Timetables <br /> is here.
          </h1>
          <p>
            Redesigned, Rewritten and Re-imagined <br /> Timetables v4 is now
            better than ever.
          </p>
          <a href="">
            <i className="bx bx-right-arrow-alt"></i>login to timetables
          </a>
        </div>
      </div>
    </main>
  );
};

export default Landing;
