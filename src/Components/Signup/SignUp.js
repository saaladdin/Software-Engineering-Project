import React from "react";
import "./SignUp.scss";
import Image from "../../Assets/Images/login-image.png"

const SignUp = () => {
    return (
        <div className="signup">
            <div className="signup-image">
                <img src={Image} alt="Image of two people watering a plant" />
            </div>

            <form className="signup-form">
                <div className="welcome-message">
                    <p>Sign up for a</p>
                    <h1>UVent</h1>
                </div>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <label htmlFor="retype-password">Retype Password</label>
                <input type="password" id="retype-password" name="retype-password" />

                <button className="submit" type="submit">Sign Up</button>

                <div className="login-link">
                    <p>← <a href="/login">Back to log in</a></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;