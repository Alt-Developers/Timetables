import { useState } from "react";
import { motion } from "framer-motion";

const SimpleModal = props => {
  return (
    <>
      <motion.div
        className="simpleModal__children"
        animate={
          props.isOpen ? { filter: "blur(1.1rem)" } : { filter: "none" }
        }>
        {props.children}
      </motion.div>
      <div
        className="simpleModal__overlay"
        style={props.isOpen ? { display: "grid" } : { display: "none" }}>
        <div className="simpleModal__wrapper">
          <motion.div
            className="simpleModal"
            animate={
              props.isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -200 }
            }>
            <h1 className="simpleModal__header">{props.header}</h1>
            <button className="simpleModal__close">
              <i className="bx bx-window-close"></i>
            </button>
            <div className="simpleModal__content">
              {props.image && <img src={props.image} alt="modal image" />}
              {props.text && <p>{props.text}</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SimpleModal;
