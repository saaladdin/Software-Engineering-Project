import React from "react";
import  "./index.scss"

const Login = () => {
    return (
        <div className="login">
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