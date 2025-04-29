import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.scss"; // Create a style for this page if needed

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="confirmationPage">
      <h1>Registration Successful!</h1>
      <p>
        You are now registered for the event:{" "}
        {state?.event?.title || "Event Name"}
      </p>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default ConfirmationPage;
