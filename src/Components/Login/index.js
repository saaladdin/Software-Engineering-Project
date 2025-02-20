import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  "./index.scss"
import Image from "../../Assets/Images/login-image.png"

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.email === email && user.password === password) {
            navigate("/dashboard");
        } else {
          setError("Incorrect email or password");
        }
      } else {
        setError("No account found. Please sign up first.");
      }
    };


    return (
        <div className="login">
            <img src={Image} alt="Image of two people watering a plant" />
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