import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../context";
import { useMediaQuery } from "react-responsive";

const Covid = (props) => {
  const covid = useSelector((state: RootState) => state.account.covid);
  const covidWorldwide = useSelector(
    (state: RootState) => state.account.covidWorldwide
  );
  const language = useSelector((state: RootState) => state.account.language);
  const isPhone = useMediaQuery({ query: "(max-width: 56.25em)" });

  return (
    <>
      <h3 className="bar__header">
        {language === "EN" ? "Coronavirus" : "สถานะการโควิด-19"}
      </h3>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bar covid"
      >
        <motion.div
          initial={isPhone ? { y: 0 } : { y: 300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bar__item blarge covid__item"
          style={{ backgroundColor: "#fc4a44" }}
        >
          {covid.isFetched && (
            <h3>
              {covid.newCases} {language === "EN" ? "Cases, " : "เคส, "}
              <br className="hiddenOnPC" />
              {language === "EN"
                ? `${covid.newDeaths} Deaths`
                : `เสียชีวิต ${covid.newDeaths} ราย`}
              <br />
              <span className="hiddenOnPhone">
                {language === "EN" ? `in ${covid.country}` : `ใน ประเทศไทย`}
              </span>
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
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bar__item bsmall covid__global"
          style={{ backgroundColor: "#c232d9" }}
        >
          {covidWorldwide.isFetched && (
            <>
              <h3 style={{ width: "80%" }}>
                {language === "EN"
                  ? `${covidWorldwide.newCases} New Global Cases`
                  : `เคสใหม่รอบโลก ${covidWorldwide.newCases} เคส`}

                <br />
              </h3>
              <p style={{ width: "60%" }}>
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
