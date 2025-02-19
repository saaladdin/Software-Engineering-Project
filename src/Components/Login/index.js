import React from "react";
import  "./index.scss"
import Image from "../../Assets/Images/login-image.png"

const Login = () => {
    return (
        <div className="login">
            <img src={Image} alt="Image of two people watering a plant" />
            <form className="login-form" action="">
                <div className="welcome-message">
                    <p>Welcome to</p>
                    <h1>Event Planner</h1>
                </div>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>

                <div className="forgot-password">
                    <p><a href="/forgotpassword">Forgot Password?</a> </p>
                </div>

                <button className="submit" type="submit">Login</button>

                <div className="signup-link">
                    <p>Don't have an account? <a href="/signup">Sign up</a> </p>
                </div>

            </form>
        </div>
    )
}

export default Login;