import Modal from "react-modal";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { modalActions } from "../context/modalSlice";
import { preferenceActions } from "../context/preferenceSlice";
import { Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--light-1)",
    boxShadow: "var(--dark-shadow)",
    borderRadius: "1.1rem",
    border: "none",
    height: "70vh",
    width: "40vw",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    padding: "0",
    position: "relative",
  },
  overlay: {
    zIndex: "10",
    backgroundColor: "var(--translucent)",
  },
};

const RedSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#fd5252",
    "&:hover": {
      backgroundColor: alpha("#fd5252", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--dark-1)",
  },
}));

const Preferences = () => {
  const [darkMode, setDarkMode] = useState(false);
  const modalIsOpen = useSelector(
    (state: RootState) => state.preference.isOpen
  );
  const [page, setPage] = useState("general");
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <button
        onClick={() => dispatch(preferenceActions.togglePreference())}
        className="preferences__close"
      >
        <i className="bx bx-x"></i>
      </button>
      <div className="preferences__left">
        <div
          onClick={() => setPage("general")}
          className={`preferences__leftItem ${
            page === "general" ? "bold" : ""
          }`}
        >
          <h4>General</h4>
        </div>
        <hr />
        <div
          onClick={() => setPage("account")}
          className={`preferences__leftItem ${
            page === "account" ? "bold" : ""
          }`}
        >
          <h4>SS Account</h4>
        </div>
      </div>
      <div className="preferences__right">
        {page === "general" && (
          <>
            <h3>General</h3>
            <div className="preferences__item">
              <h4>Dark Theme</h4>
              <RedSwitch
                checked={darkMode}
                onChange={event => setDarkMode(event.target.checked)}
              />
            </div>
            <hr />
            <div className="preferences__item">
              <h4>12 Hour Time</h4>
              <RedSwitch />
            </div>
          </>
        )}
        {page === "account" && (
          <>
            <h3>SS Account</h3>
            <div className="account">
              <img
                className="account__image"
                src="https://pbs.twimg.com/profile_images/1509787105425526787/WdSeMffL_400x400.jpg"
                alt=""
              />
              <div className="account__text">
                <h3>Jirat Chutrakul</h3>
                <p>SS Account</p>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Preferences;
