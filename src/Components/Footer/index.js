import React from "react";
import footerSvg from '../../Assets/Images/footer(2).svg'
import logo from '../../Assets/Images/logo.png'
import "./index.scss"
const Footer = () => {
  return(
  <footer className="footer">
    <img className="footer-svg" src={footerSvg} alt="Footer SVG"/>
    <div className="footer-content">
      <div className="footer-top">
        <span className="footer-span">Home</span>
        <span className="footer-span">Groupchat</span>
        <span className="footer-span">Clubs</span>
        <span className="footer-span">Contact</span>
        </div>
        <p className="footer-bottom">@2025 UVent Inc.</p>
        </div>
        <img className="footer-logo" src={logo} alt="Logo" />
        </footer>
        );
      };
      
      export default Footer;