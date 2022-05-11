import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../context";

const Footer = () => {
  const language = useSelector((state: RootState) => state.account.language);

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
        <Link to="/">
          <li>{language === "EN" ? "Home" : "หน้าหลัก"}</li>
        </Link>
        <Link to="/documentation#credits">
          <li>{language === "EN" ? "Credits" : "อ้างอิง"}</li>
        </Link>
        <Link to="/documentation#privacypolicy">
          <li>
            {language === "EN" ? "Privacy Policy" : "นโยบายความเป็นส่วนตัว"}
          </li>
        </Link>
        <a href="https://github.com/SS-Developers/Timetables/issues/new?assignees=Jiraties&labels=bug&template=bug_report.md&title=">
          <li>Report a Problem</li>
        </a>
        <li style={{ fontWeight: 600 }}>SS Timetables v3</li>
      </ul>
    </footer>
  );
};

export default React.memo(Footer);
