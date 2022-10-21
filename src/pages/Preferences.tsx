import { Link, useParams } from "react-router-dom";
import AccountPane from "../components/AccountPane";
import DeveloperPane from "../components/DeveloperPane";

const Preferences = () => {
  const { contentPane } = useParams();
  const allowedContentPanes = [
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
    { param: "appearance", full: "Appearance" },
    { param: "developer", full: "Developer Pane", element: <DeveloperPane /> },
  ];

  console.log(contentPane);

  const matchingPane = allowedContentPanes.find(
    pane => pane.param === contentPane
  );

  return (
    <section className="preferences">
      <div className="preferences__menuContainer">
        <div className="preferences__menu">
          {allowedContentPanes.map(pane => (
            <Link
              to={`/preferences/${pane.param}`}
              style={
                contentPane === pane.param ? { color: "var(--accent)" } : {}
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
          <h1>{matchingPane!.full}</h1>
          <section className="preferences__itemList">
            {matchingPane?.element}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Preferences;
