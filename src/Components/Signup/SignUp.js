import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";
import Image from "../../Assets/Images/login-image.png";
import { auth } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  // State for form errors
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    // Check if fields are empty
    if (!username.trim()) {
      formErrors.username = "Username is required";
    }
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
    if (!retypePassword.trim()) {
      formErrors.retypePassword = "Please retype your password";
    } else if (retypePassword !== password) {
      formErrors.retypePassword = "Passwords do not match";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if ((email, password)) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
      } catch (e) {
        alert("Signup error:", e);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup-image">
        <img src={Image} alt="Two people watering a plant" />
      </div>

      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="welcome-message">
          <p>Sign up for a</p>
          <h1>UVent</h1>
        </div>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span className="error">{errors.username}</span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        {/* Retype Password Field */}
        <label htmlFor="retype-password">Retype Password</label>
        <input
          type="password"
          id="retype-password"
          name="retype-password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
        />
        {errors.retypePassword && (
          <span className="error">{errors.retypePassword}</span>
        )}

        <button
          className="submit"
          type="submit"
          disabled={!username || !email || !password || !retypePassword}
        >
          Sign Up
        </button>

        <div className="login-link">
          <p>
            ← <a href="/login">Back to log in</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
