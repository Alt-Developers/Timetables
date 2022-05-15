import { useState } from "react";
import { SpinnerRoundFilled } from "spinners-react";
import { useEffect } from "react";

const Loading = (props) => {
  const [notLoading, setNotLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNotLoading(true);
    }, 5000);

    if (localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme") ?? ""
      );
    }
  }, []);

  return (
    <section className="loading">
      <div>
        <SpinnerRoundFilled
          className="loading__icon"
          color="#FF5252"
          size={150}
        />

        {notLoading ? (
          <h3>
            Still not loading?
            <br />
            Try refreshing
          </h3>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </section>
  );
};

export default Loading;
