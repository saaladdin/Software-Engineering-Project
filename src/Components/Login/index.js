import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import Image from "../../Assets/Images/login-image.png";
import { auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Eye from "../../Assets/Images/eye-solid.png";
import SlashEye from "../../Assets/Images/eye-slash-solid.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let formErrors = {};

    // Check if fields are empty

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else {
      // Simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formErrors.email = "Please enter a valid email";
      }
    }
    if (!password.trim()) {
      formErrors.password = "Password is required";
    }

    if (formErrors) {
      setError(formErrors);
    }

    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = async () => {
    if (email !== "" && password !== "" && !error) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if (user) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error);
        alert("Invalid email or password!");
      }
    }
  };

  return (
    <div className="login">
      <img src={Image} alt="Two people watering a plant" />
      <div className="login-form">
        <div className="welcome-message">
          <p>Welcome to</p>
          <h1>UVent</h1>
        </div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="passwordInput">
          <input
            type={showPassword ? `text` : `password`}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            src={showPassword ? SlashEye : Eye}
            className="passwordIcon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" id="remember" name="remember" />
            Remember me
          </label>
          <div className="forgot-password">
            <p>
              <a href="/forgotpassword">Forgot Password?</a>
            </p>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className={disable ? `submit disabled` : `submit`}
          onClick={handleLogin}
          disabled={disable}
        >
          Login
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

export default Login;
