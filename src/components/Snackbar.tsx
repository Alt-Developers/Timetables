import { useState } from "react";
import { motion } from "framer-motion";

const Snackbar = props => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      className="snackbar"
      animate={{ height: isOpen ? "5rem" : "0rem" }}
      transition={{ type: "ease" }}>
      <p>🇺🇦 SS Developers doesn't support war in Ukraine #stopwar #ukraine</p>
      <button
        onClick={() => {
          setIsOpen(false);
        }}>
        <i className="bx bx-x"></i>
      </button>
    </motion.div>
  );
};

export default Snackbar;
