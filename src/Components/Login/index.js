import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  "./index.scss"
import Image from "../../Assets/Images/login-image.png"
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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

        setError(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("http://127.0.0.1:5000/login", {
                    email,
                    password,
                });

            console.log(response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error(error.response?.data?.message || "Signup failed");
            setError({
              api: error.response?.data?.message || "Something went wrong!",
            });
          }
        }
      };


    return (
        <div className="login">
            <img src={Image} alt="Two people watering a plant" />
            <form className="login-form" onSubmit={handleLogin}>
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
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" id="remember" name="remember" />
                        Remember me
                    </label>
                    <div className="forgot-password">
                        <p><a href="/forgotpassword">Forgot Password?</a></p>
                    </div>
                </div>

                {error && <p className="error">{error}</p>}

                <button className="submit" type="submit">Login</button>

                <div className="signup-link">
                    <p>Don't have an account?
                        <span onClick={() => navigate("/signup")} className="signup-text"> Sign up</span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;