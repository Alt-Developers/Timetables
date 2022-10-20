import { useState } from "react";

const DeveloperPane = () => {
  const [color, setColor] = useState("");

  return (
    <>
      <button
        onClick={() =>
          document.documentElement.style.setProperty("--accent", "#0e3178")
        }
      >
        Newton Color
      </button>
      <button
        onClick={() =>
          document.documentElement.style.setProperty("--accent", "#da032a")
        }
      >
        Assumption Color
      </button>
      <input type="text" onChange={event => setColor(event.target.value)} />
      <button
        onClick={() =>
          document.documentElement.style.setProperty("--accent", color)
        }
      >
        Selected Color
      </button>
    </>
  );
};

export default DeveloperPane;
