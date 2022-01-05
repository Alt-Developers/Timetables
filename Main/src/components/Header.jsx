import { useState } from "react";
import { useEffect } from "react";

const Header = props => {
  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  // useEffect(() => {
  //   setInterval(() => {
  //     const date = new Date();
  //     const formatedData = date.toLocaleString("en-US", {
  //       hour: "numeric",
  //       minute: "numeric",
  //       hour12: true,
  //     });
  //     console.log(date);
  //     if (date.getSeconds() === 0) {
  //       setClock(formatedData);
  //       console.log("REFRESHED TIME!");
  //     }
  //   }, [1000]);
  // });

  return (
    <div className="header">
      <h1>
        It's currently <br />
        {clock}
      </h1>
      <div className="header__account">
        <h3>
          Jirat Chutrakul's <br />
          SS Account
        </h3>
        <img
          src="https://upload-os-bbs.hoyolab.com/upload/2021/04/17/60558723/6b4dc6912fd3129c094ecdea992abda1_401398458418138069.jpg?x-oss-process=image/resize,s_500/quality,q_80/auto-orient,0/interlace,1/format,jpg"
          alt=""
          height="150"
          width="150"
        />
      </div>
    </div>
  );
};

export default Header;
