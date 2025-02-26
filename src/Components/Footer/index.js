import React from "react";
import "./index.scss"

const Footer = () => {
    return (
      <footer>
        <h1 style={{ color: "#FFA500", textAlign: "center" }}>
          This is Footer
        </h1>
        <p>
          <span
            style={{ color: "#ff79df", cursor: "pointer", fontWeight: "bold" }}
          >
            Footer
          </span>
        </p>
      </footer>
    );
}

export default Footer;