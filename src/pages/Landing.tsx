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
          <a
            className="navigation__links--getStarted"
            href="https://authentication.altdevelopers.dev/signup/timetables"
          >
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
          <a href="https://authentication.altdevelopers.dev/login/timetables">
            <i className="bx bx-right-arrow-alt"></i>login to timetables
          </a>
        </div>
      </div>

      <div className="landing__features">
        <div className="landing__features--title">
          <h1>Maximize your time</h1>
          <p>
            Timetables provides you with features that help you get through your
            day
          </p>
        </div>
        <div className="landing__featuresContainer">
          <div className="landing__featuresItem">
            <div>
              <h3>
                Always Available <br />
                <span className="red">Anytime Anywhere.</span>{" "}
              </h3>
              <p>
                Available everywhere you go, Timetables allows you to view your
                upcoming classes from all your devices
              </p>
            </div>
            <img src="" alt="" />
          </div>
          <div className="landing__featuresItem">
            <div>
              <h3>
                The Timeline,
                <br />
                Simply <span className="red">Amazing</span>{" "}
              </h3>
              <p>
                Eliminating the process of even going into the full Timetables
                page by displaying you with the following classes at the right
                time.
              </p>
            </div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
