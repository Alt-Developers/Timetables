import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Covid = props => {
  const covid = useSelector(state => state.account.covid);
  const covidWorldwide = useSelector(state => state.account.covidWorldwide);

  return (
    <>
      <h3 className="bar__header">Coronavirus</h3>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bar covid">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bar__item blarge"
          style={{ backgroundColor: "#fc4a44" }}>
          {!covid.isFetched && (
            <h3>
              {covid.newCases} Cases, {covid.newDeaths} Deaths
              <br />
              in {covid.country}
            </h3>
          )}
          <p>Last Updated {covid.lastUpdated}</p>
          <img
            src={`./icons/coronavirus.png`}
            className="bar__icon"
            alt="Science Icon"
            height="100"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bar__item bsmall covid__global"
          style={{ backgroundColor: "#c232d9" }}>
          {!covidWorldwide.isFetched && (
            <>
              <h3>
                {covidWorldwide.newCases} New Global Cases
                <br />
              </h3>
              <p>Last Updated: {covidWorldwide.lastUpdated}</p>
            </>
          )}
          <img
            src={`./icons/earth.png`}
            className="bar__icon"
            alt="Science Icon"
            height="100"
          />
        </motion.div>
      </motion.section>
    </>
  );
};

export default Covid;
