import { useEffect, useState } from "react";

const Header = () => {
  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h12",
    })
  );

  useEffect(() => {
    let clockInterval = setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        // hourCycle: dateTime === "12h" ? "h12" : "h23",
        hourCycle: "h12",
      });
      date.getSeconds() === 0 && setClock(formatedDate);
      // @ts-ignore
    }, [1000]);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className="header">
      <h1>
        It's Currently <br />
        <span className="accent">{clock}</span>
      </h1>
      <div className="header__options">
        <div onClick={() => {}}>
          <i className="bx bx-cog"></i>
        </div>
        <img
          src="https://pbs.twimg.com/profile_images/1509787105425526787/WdSeMffL_400x400.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
