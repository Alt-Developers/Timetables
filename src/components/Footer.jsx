import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const language = useSelector(state => state.account.language);

  return (
    <footer className="dark-footer">
      {language === "EN" ? (
        <h3>
          <a href="https://github.com/SS-Developers/Timetables/blob/main/LICENSE">
            GNU General Public License v2.0 &copy;2022
          </a>
          - Prawich Thawansakdivudhi and Jirat Chutrakul
        </h3>
      ) : (
        <h3>
          <a href="https://github.com/SS-Developers/Timetables/blob/main/LICENSE">
            GNU General Public License v2.0 &copy; พ.ศ.2565
          </a>{" "}
          - ด.ช.ปวิช ถวัลย์ศักดิวุฒิ และ ด.ช.จิรัฏฐ์ ชูตระกูล
        </h3>
      )}
      <ul>
        <a href="https://ssdevelopers.xyz">
          <li>Portals</li>
        </a>
        <Link to="/">
          <li>{language === "EN" ? "Home" : "หน้าหลัก"}</li>
        </Link>
        <Link to="/credentials">
          <li>{language === "EN" ? "Credits" : "อ้างอิง"}</li>
        </Link>
        <li>SS Timetables v3</li>
      </ul>
    </footer>
  );
};

export default React.memo(Footer);
