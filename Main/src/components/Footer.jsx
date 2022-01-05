import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="dark-footer">
    <h3>MPL2.0 Lisence &copy;2021 Prawich & Jirat</h3>
    <ul>
      <a href="https://ssdevelopers.xyz">
        <li>Portals</li>
      </a>
      <Link to="/">
        <li>Home</li>
      </Link>
      <li>SS Timetables v2</li>
    </ul>
  </footer>
);

export default React.memo(Footer);
