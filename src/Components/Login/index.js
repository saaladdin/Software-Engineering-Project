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
                <button className="submit" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;