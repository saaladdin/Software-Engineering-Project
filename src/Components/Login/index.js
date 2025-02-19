import React from "react";
import { useNavigate } from "react-router-dom";
import  "./index.scss"
import Image from "../../Assets/Images/login-image.png"

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard"); // Redirect to Dashboard
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
                <input type="email" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
                
                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" id="remember" name="remember" />
                        Remember me
                    </label>
                    <div className="forgot-password">
                        <p><a href="/forgotpassword">Forgot Password?</a> </p>
                    </div>
                </div>

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