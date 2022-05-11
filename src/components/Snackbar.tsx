import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Snackbar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const isPhone = useMediaQuery({ query: "(max-width: 56.25em)" });

  return (
    <motion.div
      className="snackbar"
      animate={{ height: isOpen ? (isPhone ? "10vh" : "5rem") : "0rem" }}
      transition={{ type: "ease" }}
    >
      <p>🇺🇦 SS Developers doesn't support war in Ukraine #stopwar #ukraine</p>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <i className="bx bx-x"></i>
      </button>
    </motion.div>
  );
};

export default Snackbar;
