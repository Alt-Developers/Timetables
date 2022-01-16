import { useState } from "react";
import { SpinnerRoundFilled } from "spinners-react";

const Loading = props => {
  const [notLoading, setNotLoading] = useState(false);

  setTimeout(() => {
    if (notLoading) setNotLoading(true);
  }, 5000);

  return (
    <section className="redirect">
      <div>
        <SpinnerRoundFilled
          className="redirect__icon"
          color="#FF5252"
          size={150}
        />

        {notLoading ? (
          <h3>
            Not Loading?
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
