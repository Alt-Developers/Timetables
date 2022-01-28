import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const language = useSelector(state => state.account.language);

  return (
    <footer className="dark-footer">
      {language === "EN" ? (
        <h3>All Rights Reserved &copy;2022 SS Developers Group</h3>
      ) : (
        <h3>สงวนลิขสิทธิ์ทั้งหมด &copy; 2565 SS Developers Group</h3>
      )}
      <ul>
        <a href="https://ssdevelopers.xyz">
          <li>Portals</li>
        </a>
        <Link to="/">
          <li>{language === "EN" ? "Home" : "หน้าหลัก"}</li>
        </Link>
        <li>SS Timetables v2</li>
      </ul>
    </footer>
  );
};

export default React.memo(Footer);
