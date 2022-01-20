import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Covid = props => {
  const covid = useSelector(state => state.account.covid);
  const covidWorldwide = useSelector(state => state.account.covidWorldwide);
  const language = useSelector(state => state.account.language);

  return (
    <>
      <h3 className="bar__header">
        {language === "EN" ? "Coronavirus" : "สถานะการโควิด-19"}
      </h3>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bar covid">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bar__item blarge covid__item"
          style={{ backgroundColor: "#fc4a44" }}>
          {!covid.isFetched && (
            <h3>
              {covid.newCases} {language === "EN" ? "Cases, " : "เคส, "}
              {language === "EN"
                ? `${covid.newDeaths} Deaths`
                : `เสียชีวิต ${covid.newDeaths} ราย`}
              <br />
              {language === "EN" ? `in ${covid.country}` : `ใน ประเทศไทย`}
            </h3>
          )}
          <p>
            {language === "EN" ? "Last Updated " : "อัปเดตข้อมูลล่าสุด "}
            {covid.lastUpdated}
          </p>
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
                {language === "EN"
                  ? `${covidWorldwide.newCases} New Global Cases`
                  : `เคสใหม่รอบโลก ${covidWorldwide.newCases} เคส`}

                <br />
              </h3>
              <p>
                {language === "EN" ? "Last Updated " : "อัปเดตข้อมูลล่าสุด "}
                {covidWorldwide.lastUpdated}
              </p>
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
