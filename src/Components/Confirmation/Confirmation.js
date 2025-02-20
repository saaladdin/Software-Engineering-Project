import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
    const navigate = useNavigate();

    return (
        <div className="confirmation">
            <h1>Confirmation Page</h1>
            <p>Your account has been created successfully!</p>
            <p>
                <span 
                    onClick={() => navigate("/login")}
                    style={{ color: "#ff79df", cursor: "pointer", fontWeight: "bold" }}
                >
                    Login
                </span>
            </p>
        </div>
    );
};

export default Confirmation;