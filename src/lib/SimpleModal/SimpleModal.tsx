import AddTimetableItem from "../../components/AddTimetableItem";
import ColoredButton from "../../components/ColoredButton";

import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../context/modalSlice";
import { RootState } from "../../context";
import { useMediaQuery } from "react-responsive";
import { refetchActions } from "../../context/refetchSlice";

import "./SimpleModal.css";
import { useState } from "react";

const SimpleModal = (props: any) => {
  const modalState = useSelector((state: RootState) => state.modal);
  const isPhone = useMediaQuery({ query: "(max-width: 56.25em)" });
  const language = useSelector((state: RootState) => state.account.language);
  const [id, setId] = useState<string>("");
  const [errorMes, setErrorMes] = useState<boolean | string>(false);

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch("https://apis.ssdevelopers.xyz/timetables/registerUserClass", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify({
        classId: id,
        isPrimary: false,
      }),
    })
      .then((data) => {
        if (data.status < 200 || data.status > 299) {
          setErrorMes("something went wrong");
        } else {
          setErrorMes(false);
        }
        return data.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(refetchActions.refetch(""));
        if (data.modal) {
          setErrorMes(data.header);
        }
      });
  };

  return (
    <>
      <motion.div
        className="simpleModal__children"
        animate={
          modalState.isOpen
            ? {
                filter: modalState.centeredModal
                  ? "brightness(.7)"
                  : "blur(.5rem)",
              }
            : { filter: "none" }
        }
        // onClick={() => dispatch(modalActions.closeModal())}
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100",
        }}
      >
        {props.children}
      </motion.div>
      <div
        className="simpleModal__overlay"
        style={
          modalState.isOpen
            ? { display: "grid", height: "100vh" }
            : {
                display: "hidden",
                height: 0,
              }
        }

        // style={{ display: "none", x: 1000 }}
      >
        {!modalState.centeredModal ? (
          <div className="simpleModal__wrapper">
            <motion.div
              className={`simpleModal`}
              initial={{ opacity: 0, y: isPhone ? "60vh" : "-40vh" }}
              animate={
                modalState.isOpen
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : { opacity: 0, y: isPhone ? "60vh" : "-40vh" }
              }
            >
              <h1 className="simpleModal__header">
                {modalState.type.code === "IMPORTANT" && (
                  <span
                    style={{
                      backgroundColor: "#fd5252",
                      padding: "1rem",
                      borderRadius: "1.1rem",
                      fontSize: "2rem",
                      marginRight: "1rem",
                    }}
                  >
                    IMPORTANT
                  </span>
                )}
                {modalState.header}
              </h1>
              <button
                className={`simpleModal__close ${
                  modalState.type.code === "IMPORTANT"
                    ? "simpleModal__buttonDisabled"
                    : ""
                }`}
                disabled={modalState.type.code === "IMPORTANT"}
                onClick={() => dispatch(modalActions.closeModal())}
              >
                <i className="bx bx-window-close"></i>
              </button>
              <div className="simpleModal__content">
                {modalState.text && <p>{modalState.text}</p>}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="simpleModal__centered"
            exit={{
              display: "hidden",
              height: 0,
            }}
          >
            <i
              onClick={() => dispatch(modalActions.closeModal())}
              className="bx bx-x simpleModal__centerClose"
            ></i>
            <div
              className="simpleModal__top"
              style={{ borderBottom: "1px solid var(--gray-dark-1)" }}
            >
              <h3>
                {language === "EN" ? "Add class by ID" : "เพิ่มห้องด้วย ID"}
              </h3>
              <p>{errorMes}</p>
              <input
                id="idInput"
                value={id}
                onChange={(event) => setId(event.target.value)}
                type="text"
                placeholder="ID"
              />
              <ColoredButton
                type={"submit"}
                onClick={submitHandler}
                text={language === "EN" ? "Add" : "เพิ่ม"}
                style={{ left: "1rem" }}
              />
            </div>
            <div className="simpleModal__bottom">
              <h3>
                {language === "EN" ? "Add Class to Your List" : "เพิ่มห้อง"}
              </h3>
              <div
                className="simpleModal__content"
                style={{
                  height: "calc(100% - 5rem)",
                  backgroundColor: "var(--gray-light-3)",
                }}
              >
                <AddTimetableItem
                  className="simpleModal__addTimetables"
                  header={language === "EN" ? "Class" : "ห้อง"}
                  button={language === "EN" ? "Add" : "เพิ่ม"}
                  header2={language === "EN" ? "School" : "โรงเรียน"}
                  placeholder2={
                    language === "EN" ? "Search for schools" : "ค้นหาโรงเรียน"
                  }
                  placeholder={
                    language === "EN" ? "Search for timetables" : "ค้นหาห้อง"
                  }
                  isPrimary={false}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default SimpleModal;
