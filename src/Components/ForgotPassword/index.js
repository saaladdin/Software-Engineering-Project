import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import Image from "../../Assets/Images/login-image.png";
import { auth } from "../../FirebaseConfig";
import {
  sendPasswordResetEmail
} from "firebase/auth";

import logo from "../../Assets/Images/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);


  const validateForm = () => {

    // Check if fields are empty
    if (!email.trim()) {
      alert("Email is required")
    } else {
      // Simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email")
      }
    }

  };


  const handleSubmit = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert("Password reset email sent!")
        window.location.href = "/login"
    } catch (error) {
        alert(error.message)
    }
  }

  return (
    <div className="login">
      <img src={Image} alt="Two people watering a plant" className="image" />
      <div className="login-form">
        <img src={logo} alt="Website Logo" className="logo" />
        <div className="welcome-message">
          <p>Reset Password</p>
        </div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

   
        <button
          className={disable ? `submit disabled` : `submit`}
          onClick={() => handleSubmit(email)}
          disabled={disable}
        >
          Send
        </button>

        <div className="signup-link">
          <p>
            Don't have an account?
            <span onClick={() => navigate("/signup")} className="signup-text">
              {" "}
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
