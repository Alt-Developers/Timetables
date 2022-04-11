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

const Setup = props => {
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
      .then(data => {
        if (data.status === 200) return data.json();
        if (data.status === 500) return;
      })
      .then(data => {
        dispatch(accountActions.login(data));
        dispatch(accountActions.setLanguage(data.config.language));
      });
  }, []);

  if (selectedPrimary && agreed) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const liftDone = isDone => {
    setSelectedPrimary(isDone);
  };

  return (
    <section className="setup">
      <motion.div
        className="setup__left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "ease-in" }}>
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
            }>
            <i
              className="bx bx-check-shield"
              style={
                agreed
                  ? {
                      color: "#fff",
                    }
                  : {}
              }></i>
            <p
              style={
                agreed
                  ? {
                      color: "#fff",
                    }
                  : {}
              }>
              <span>{language === "EN" ? "Step 1." : "ขั้นตอนที่ 1."}</span>{" "}
              {language === "EN"
                ? "Agree to the End User License Agreement"
                : "ตกลงกับข้อตกลงของ Timetables"}
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
            }>
            <i
              className="bx bx-calendar-exclamation"
              style={
                selectedPrimary
                  ? {
                      color: "#fff",
                    }
                  : {}
              }></i>
            <p
              style={
                selectedPrimary
                  ? {
                      color: "#fff",
                    }
                  : {}
              }>
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
            {language === "EN" ? "Agreements" : "ข้อตกลง"}
          </h3>
          <div className="eula">
            <div className="eula__text">
              End-User License Agreement (EULA) of Timetables This End-User
              License Agreement ("EULA") is a legal agreement between you and SS
              Developers. Our EULA was created by EULA Template for Timetables.
              This EULA agreement governs your acquisition and use of our
              Timetables software ("Software") directly from SS Developers or
              indirectly through a SS Developers authorized reseller or
              distributor (a "Reseller"). Please read this EULA agreement
              carefully before completing the installation process and using the
              Timetables software. It provides a license to use the Timetables
              software and contains warranty information and liability
              disclaimers. If you register for a free trial of the Timetables
              software, this EULA agreement will also govern that trial. By
              clicking "accept" or installing and/or using the Timetables
              software, you are confirming your acceptance of the Software and
              agreeing to become bound by the terms of this EULA agreement. If
              you are entering into this EULA agreement on behalf of a company
              or other legal entity, you represent that you have the authority
              to bind such entity and its affiliates to these terms and
              conditions. If you do not have such authority or if you do not
              agree with the terms and conditions of this EULA agreement, do not
              install or use the Software, and you must not accept this EULA
              agreement. This EULA agreement shall apply only to the Software
              supplied by SS Developers herewith regardless of whether other
              software is referred to or described herein. The terms also apply
              to any SS Developers updates, supplements, Internet-based
              services, and support services for the Software, unless other
              terms accompany those items on delivery. If so, those terms apply.
              License Grant SS Developers hereby grants you a personal,
              non-transferable, non-exclusive licence to use the Timetables
              software on your devices in accordance with the terms of this EULA
              agreement. You are permitted to load the Timetables software (for
              example a PC, laptop, mobile or tablet) under your control. You
              are responsible for ensuring your device meets the minimum
              requirements of the Timetables software. You are not permitted to:
              Edit, alter, modify, adapt, translate or otherwise change the
              whole or any part of the Software nor permit the whole or any part
              of the Software to be combined with or become incorporated in any
              other software, nor decompile, disassemble or reverse engineer the
              Software or attempt to do any such things Reproduce, copy,
              distribute, resell or otherwise use the Software for any
              commercial purpose Allow any third party to use the Software on
              behalf of or for the benefit of any third party Use the Software
              in any way which breaches any applicable local, national or
              international law use the Software for any purpose that SS
              Developers considers is a breach of this EULA agreement
              Intellectual Property and Ownership SS Developers shall at all
              times retain ownership of the Software as originally downloaded by
              you and all subsequent downloads of the Software by you. The
              Software (and the copyright, and other intellectual property
              rights of whatever nature in the Software, including any
              modifications made thereto) are and shall remain the property of
              SS Developers. SS Developers reserves the right to grant licences
              to use the Software to third parties. Termination This EULA
              agreement is effective from the date you first use the Software
              and shall continue until terminated. You may terminate it at any
              time upon written notice to SS Developers. It will also terminate
              immediately if you fail to comply with any term of this EULA
              agreement. Upon such termination, the licenses granted by this
              EULA agreement will immediately terminate and you agree to stop
              all access and use of the Software. The provisions that by their
              nature continue and survive will survive any termination of this
              EULA agreement. Governing Law This EULA agreement, and any dispute
              arising out of or in connection with this EULA agreement, shall be
              governed by and construed in accordance with the laws of th.
            </div>
            <div className="eula__button">
              <h3>{language === "EN" ? "Agree" : "ตกลง"}</h3>
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
