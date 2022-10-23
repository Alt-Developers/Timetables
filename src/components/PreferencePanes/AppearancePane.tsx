import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AppearancePane = () => {
  const selectableColors = ["#fd5252", "#0e3178"];
  const [selectedColor, setSelectedColor] = useState("#fd5252");

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

      <div className="preference__item">
        <h3>Dark Mode</h3>
      </div>
    </>
  );
};

export default AppearancePane;
