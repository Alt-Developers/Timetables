import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AppearancePane = () => {
  const selectableColors = ["#fd5252", "#0e3178", "#65C98A"];
  const [selectedColor, setSelectedColor] = useState("#fd5252");
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", selectedColor);
  }, [selectedColor]);

  return (
    <>
      <div className="preferences__displayItem">
        <h3>Accent Color</h3>
        <p>Pick from our curated selection of colors</p>

        <div className="appearancePane__colors">
          {selectableColors.map(selectableColor => (
            <div
              className="appearancePane__color"
              style={{ backgroundColor: selectableColor }}
              onClick={() => setSelectedColor(selectableColor)}
            >
              <motion.div
                initial={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={
                  selectedColor === selectableColor
                    ? {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        height: "3.8rem",
                        width: "3.8rem",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                      }
                    : { height: "0rem", width: "0rem" }
                }
                transition={{ duration: 0.1 }}
              ></motion.div>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="preferences__displayItem">
        <h3>Theme</h3>
        <p></p>

        <div className="appearancePane__colors">
          <div
            className="appearancePane__color"
            style={{ backgroundColor: "#f1f1f1" }}
          >
            <motion.div
              initial={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={
                theme === "light"
                  ? {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      height: "3.8rem",
                      width: "3.8rem",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }
                  : { height: "0rem", width: "0rem" }
              }
              transition={{ duration: 0.1 }}
            ></motion.div>
          </div>

          <div
            className="appearancePane__color"
            style={{ backgroundColor: "#262626" }}
          >
            <motion.div
              initial={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={
                theme === "dark"
                  ? {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      height: "3.8rem",
                      width: "3.8rem",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }
                  : { height: "0rem", width: "0rem" }
              }
              transition={{ duration: 0.1 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppearancePane;
