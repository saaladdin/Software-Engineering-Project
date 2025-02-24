import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <h1>Welcome to Your Dashboard!</h1>
            <p>
                <span 
                    onClick={() => navigate("/login")}
                    style={{ color: "#ff79df", cursor: "pointer", fontWeight: "bold" }}
                >
                    Logout
                </span>
            </p>
        </div>
    );
};

export default Dashboard;
