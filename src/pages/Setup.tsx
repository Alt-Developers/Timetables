import AddTimetableItem from "../components/AddTimetableItem";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { accountActions } from "../context/accountSlice";
import { useState } from "react";
import { RootState } from "../context";

const Setup = (props) => {
  const language = useSelector((state: RootState) => state.account.language);
  const userInfo = useSelector((state: RootState) => state.account.userInfo);
  const [selectedPrimary, setSelectedPrimary] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://apis.ssdevelopers.xyz/auth/getUser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((data) => {
        if (data.status === 200) return data.json();
        if (data.status === 500) return;
      })
      .then((data) => {
        dispatch(accountActions.login(data));
        dispatch(accountActions.setLanguage(data.config.language));
      });
  }, []);

  if (selectedPrimary && agreed) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const liftDone = (isDone) => {
    setSelectedPrimary(isDone);
  };

  return (
    <section className="setup">
      <motion.div
        className="setup__left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "ease-in" }}
      >
        <div className="setup__textCon" style={{ background: userInfo.color }}>
          <h1>
            {language === "EN"
              ? "Welcome to Timetables"
              : "ยินดีต้อนรับเข้าสู่ Timetables"}
          </h1>
          <p>
            {language === "EN"
              ? "We'll first need to set you up"
              : "เราต้องขอทำการตั้งค่าแอคเค้าท์คุณ"}
          </p>
        </div>

        <div className="setup__steps">
          <div
            className="setup__step"
            style={
              agreed
                ? {
                    background: userInfo.color,
                    boxShadow: `0 0 3rem ${userInfo.color}`,
                  }
                : {}
            }
          >
            <i
              className="bx bx-check-shield"
              style={
                agreed
                  ? {
                      color: "#fff",
                    }
                  : {}
              }
            ></i>
            <p
              style={
                agreed
                  ? {
                      color: "#fff",
                    }
                  : {}
              }
            >
              <span>{language === "EN" ? "Step 1." : "ขั้นตอนที่ 1."}</span>{" "}
              {language === "EN"
                ? "Agree to the PDPA."
                : "ตกลงกับ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล"}
            </p>
          </div>
          <div
            className="setup__step"
            style={
              selectedPrimary
                ? {
                    background: userInfo.color,
                    boxShadow: `0 0 3rem ${userInfo.color}`,
                  }
                : {}
            }
          >
            <i
              className="bx bx-calendar-exclamation"
              style={
                selectedPrimary
                  ? {
                      color: "#fff",
                    }
                  : {}
              }
            ></i>
            <p
              style={
                selectedPrimary
                  ? {
                      color: "#fff",
                    }
                  : {}
              }
            >
              <span>{language === "EN" ? "Step 2." : "ขั้นตอนที่ 2."}</span>{" "}
              {language === "EN"
                ? "Set your primary class"
                : "ตั้งห้องหลักของคุณ"}
            </p>
          </div>
        </div>
      </motion.div>
      <div className="setup__right">
        {/* <div className="setup__preview">
          <div className="setup__imgCon" style={{ background: userInfo.color }}>
            <img
              src={`https://apis.ssdevelopers.xyz/${userInfo.profilePicture}`}
              alt="user profile picture"
            />
          </div>
          <div className="setup__nameCon">
            <h4>
              {userInfo.firstName} {userInfo.lastName}
            </h4>
            <p>{userInfo.email}</p>
          </div>
          <div className="setup__infoCon">
            <h4>Info:</h4>
            <p>Studies At: The Newton</p>
            <p>Class: Year-10 A</p>
          </div>
        </div> */}
        <div>
          <h3 className="bar__header">
            {language === "EN" ? "PDPA Agreements" : "ข้อตกลง"}
          </h3>
          <div className="eula">
            <div className="eula__text">
              Personal Data Protection Policy SS Developers regconizes the
              importance of the protection of your personal data. This privacy
              policy explains our practices regarding the collection used or
              discosure of personal data including other's right of data.
              Subject in accordance with the Personal Data Laws of Thailand. 1.)
              Collection of Personal Data Personal data we have received
              directly receive from the user in the account registeration
              process 2.) Types of Data Collected Personal data which is name,
              surname, date of brith and age. Contact information which is Email
              Adress Account details such as username, password, account data
              and others. 3.) Children If you are under the age of 20 or having
              legal restrictions, we collect or disclose your personal data. We
              require your parents or guardian to provide consent to us or allow
              by the applicable laws. If we become aware that we have collected
              personal data from children without verification of parental
              consent, we take step to remove that information from our
              databases. 4.) Storage of Data We store your personal data as soft
              copy (Electronic Documents). We store your personal data by using
              a server in Thailand and third-party server service providers
              outside of Thailand 5.) Use of Data We use the collected data to
              create and manage accounts, to improve products, services, or user
              experiences and to share and manage information within
              organization 6.) Disclosure of Personal Data We may disclose your
              personal data to the organization in certain circumstances. We may
              disclose your personal data within our organization to provide and
              develop our products or service. We may combine information
              internally across the different products or services covered by
              this Privacy Policy to help us be more relevant and useful to you
              and others. 7.) Data Retention We will retain your personal data
              for as long as necessary during the period you are a customer or
              under relationship with us, or for as long as necessary in
              connection with the purposes set out in this Privacy Policy,
              unless law requires or permits a longer retention period. We will
              erase, destroy or anonymize your personal data when it is no
              longer necessary or when the period lapses. 8.) Data Subject
              Rights Subject to the Personal Data Protection Laws thereof, you
              may exercise any of these rights in the following: Withdrawal of
              consent: If you have given consent to us to collect, use or
              disclose your personal data whether before or after the effective
              date of the Personal Data Protection Laws, you have the right to
              withdraw such consent at any time throughout the period your
              personal data available to us, unless it is restricted by laws or
              you are still under beneficial contract. Data access: You have the
              right to access your personal data that is under our
              responsibility; to request us to make a copy of such data for you;
              and to request us to reveal as to how we obtain your personal
              data. Data portability: You have the right to obtain your personal
              data if we organize such personal data in automatic
              machine-readable or usable format and can be processed or
              disclosed by automatic means; to request us to send or transfer
              the personal data in such format directly to other data
              controllers if doable by automatic means; and to request to obtain
              the personal data in such format sent or transferred by us
              directly to other data controller unless not technically feasible.
              Objection: You have the right to object to collection, use or
              disclosure of your personal data at any time if such doing is
              conducted for legitimate interests of us, corporation or
              individual which is within your reasonable expectation; or for
              carrying out public tasks. Data erasure or destruction: You have
              the right to request us to erase, destroy or anonymize your
              personal data if you believe that the collection, use or
              disclosure of your personal data is against relevant laws; or
              retention of the data by us is no longer necessary in connection
              with related purposes under this Privacy Policy; or when you
              request to withdraw your consent or to object to the processing as
              earlier described. Suspension: You have the right to request us to
              suspend processing your personal data during the period where we
              examine your rectification or objection request; or when it is no
              longer necessary and we must erase or destroy your personal data
              pursuant to relevant laws but you instead request us to suspend
              the processing. Rectification: You have the right to rectify your
              personal data to be updated, complete and not misleading.
              Complaint lodging: You have the right to complain to competent
              authorities pursuant to relevant laws if you believe that the
              collection, use or disclosure of your personal data is violating
              or not in compliance with relevant laws. You can exercise these
              rights as the Data Subject by contacting our Data Protection
              Officer as mentioned below. We will notify the result of your
              request within 30 days upon receipt of such request. If we deny
              the request, we will inform you of the reason via SMS, email
              address, telephone, registered mail (if applicable). 9.) Data
              Security We endeavor to protect your personal data by establishing
              security measures in accordance with the principles of
              confidentiality, integrity, and availability to prevent loss,
              unauthorized or unlawful access, destruction, use, alteration, or
              disclosure including administrative safeguard, technical
              safeguard, physical safeguard and access controls. 10.) Data
              Breach Notification We will notify the Office of the Personal Data
              Protection Committee without delay and, where feasible, within 72
              hours after having become aware of it, unless such personal data
              breach is unlikely to result in a risk to the rights and freedoms
              of you. If the personal data breach is likely to result in a high
              risk to the rights and freedoms of you, we will also notify the
              personal data breach and the remedial measures to you without
              delay through our website, SMS, email address, telephone or
              registered mail (if applicable). 10.) Changes to this Privacy
              Policy We may change this Privacy Policy from time to time. Any
              changes of this Privacy Policy, we encourage you to frequently
              check on our website. This Privacy Policy was last updated and
              effective on 18th April 2022 11.) Links to Other Sites The purpose
              of this Privacy Policy is to offer products or services and use of
              our website. Any websites from other domains found on our site is
              subject to their privacy policy which is not related to us. 12.)
              Contact Information If you have any questions about this Privacy
              Policy or would like to exercise your rights, you can contact us
              by using the following details: Data Controller SS Developers 316
              Banlatdao alley, Sanphawut Rd., Bang Na Nuea, Bang Na, Bangkok,
              10260 Email: prawich@ssdevelopers.xyz,
              jiratchutrakul@ssdevelopers.xyz Website: ssdevelopers.xyz Phone:
              0935936551, 0992940440 Discord: S Ξ N#3334 , 👈(⌒▽⌒)👉#8066 Data
              Protection Officer SS Developers Team 316 Banlatdao alley,
              Sanphawut Rd., Bang Na Nuea, Bang Na, Bangkok, 10260 Email:
              prawich@ssdevelopers.xyz, jiratchutrakul@ssdevelopers.xyz
              Phone:0935936551, 0992940440 Discord: S Ξ N#3334 , 👈(⌒▽⌒)👉#8066
            </div>
            <div className="eula__button">
              <h3>{language === "EN" ? "I accept the agreements" : "ตกลง"}</h3>
              <button onClick={() => setAgreed(!agreed)}>
                {agreed ? (
                  <i className="bx bx-checkbox-checked"></i>
                ) : (
                  <i className="bx bx-checkbox"></i>
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="bar__header">
            {language === "EN" ? "What class are you in?" : "คุณอยู่ห้องอะไร"}
          </h3>
          {userInfo && (
            <AddTimetableItem
              header={language === "EN" ? "Class" : "ห้องของฉันคือ"}
              header2={language === "EN" ? "School" : "โรงเรียนฉันคือ"}
              placeholder2={
                language === "EN" ? "Search for schools" : "ค้นหาโรงเรียน"
              }
              button={
                language === "EN"
                  ? "Make this my class"
                  : "ตั้งห้องนี้เป็นห้องของฉัน"
              }
              placeholder={
                language === "EN" ? "Search for timetables" : "ค้นหาห้อง"
              }
              isPrimary={true}
              isNewUser={true}
              style={{
                width: "100%",
                filter: "none",
              }}
              liftDone={liftDone}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Setup;
