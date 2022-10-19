import { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    const date = new Date();
    setYear(date.getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer__leftAligned">
        GNU General Public License v2.0 ©{year} - Prawich Thawansakdivudhi and
        Jirat Chutrakul
      </div>
      <div className="footer__rightAligned">
        Timetables <span className="accent">v4</span>
      </div>
    </footer>
  );
};

export default Footer;
