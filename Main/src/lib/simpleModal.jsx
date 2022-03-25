import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import AddTimetableItem from "../components/AddTimetableItem";
import { modalActions } from "../context/modalSlice";
import { useMediaQuery } from "react-responsive";

const SimpleModal = props => {
  const language = useSelector(state => state.account.language);
  const dispatch = useDispatch();

  return (
    <>
      <motion.div
        className="simpleModal__children"
        animate={props.isOpen ? { filter: "blur(1.1rem)" } : { filter: "none" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "fit-content",
        }}>
        {props.children}
      </motion.div>
      <motion.div
        className="simpleModal__overlay"
        animate={
          props.isOpen
            ? { display: "grid", y: 0 }
            : { display: "hidden", y: -1000 }
        }
        // style={{ display: "none", x: 1000 }}
      >
        <div className="simpleModal__wrapper">
          <motion.div
            className="simpleModal"
            animate={
              props.isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -200 }
            }>
            <h1 className="simpleModal__header">{props.header}</h1>
            <button
              className="simpleModal__close"
              onClick={() => dispatch(modalActions.closeModal())}>
              <i className="bx bx-window-close"></i>
            </button>
            <div className="simpleModal__content">
              {props.image && <img src={props.image} alt="modal image" />}
              {props.text && <p>{props.text}</p>}
              {props.type && props.type.type === "NEW-USER" && (
                <>
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
                      marginTop: "2rem",
                      width: "100%",
                      marginBottom: "0rem",
                      filter: "none",
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SimpleModal;
