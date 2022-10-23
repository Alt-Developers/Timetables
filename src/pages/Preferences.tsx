import DeveloperPane from "../components/PreferencePanes/DeveloperPane";
import AppearancePane from "../components/PreferencePanes/AppearancePane";
import AccountPane from "../components/PreferencePanes/AccountPane";

import { Link, useParams } from "react-router-dom";
import { contentPane } from "../models/TimetableTypes";
import { useEffect } from "react";

const Preferences = () => {
  const { preferencePane } = useParams();
  const allowedPreferencePanes: contentPane[] = [
    {
      param: "account",
      full: (
        <h1>
          Alternate<span className="accent">.</span> <br />
          Account
        </h1>
      ),
      element: <AccountPane />,
    },
    {
      param: "appearance",
      full: (
        <h1>
          Appearance<span className="accent">.</span>
        </h1>
      ),
      element: <AppearancePane />,
    },
    {
      param: "developer",
      full: (
        <h1>
          Developer Pane<span className="accent">.</span>
        </h1>
      ),
      element: <DeveloperPane />,
    },
  ];

  useEffect(() => {
    document.title = "Preferences | Alt Timetables";
  }, []);

  const matchingPane = allowedPreferencePanes.find(
    pane => pane.param === preferencePane
  );

  return (
    <section className="preferences">
      <div className="preferences__menuContainer">
        <div className="preferences__menu">
          {allowedPreferencePanes.map(pane => (
            <Link
              to={`/preferences/${pane.param}`}
              style={
                preferencePane === pane.param ? { color: "var(--accent)" } : {}
              }
            >
              {pane.param.charAt(0).toUpperCase() + pane.param.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <div className="preferences__contentContainer">
        <div className="preferences__content">
          <Link to="/" className="preferences__exit">
            <i className="bx bx-x"></i>
          </Link>
          {matchingPane!.full}
          <section className="preferences__itemList">
            {matchingPane?.element}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Preferences;
