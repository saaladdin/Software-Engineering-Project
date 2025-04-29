import React from "react";
import { useNavigate } from "react-router-dom"; // ← Import navigate
import footerSvg from '../../Assets/Images/footer(2).svg';
import logo from '../../Assets/Images/logo.png';
import "./index.scss";

const Footer = () => {
  const navigate = useNavigate(); // ← Hook to navigate

  return (
    <footer className="footer">
      <img className="footer-svg" src={footerSvg} alt="Footer SVG" />
      <div className="footer-content">
        <div className="footer-top">
          <span className="footer-span" onClick={() => navigate("/Dashboard")}>Home</span>
          <span className="footer-span" onClick={() => navigate("/Chat")}>Groupchat</span>
          <span className="footer-span" onClick={() => navigate("/Profile")}>Profile</span>
        </div>
        <p className="footer-bottom">@2025 UVent Inc.</p>
      </div>
      <img className="footer-logo" src={logo} alt="Logo" />
    </footer>
  );
};

export default Footer;
