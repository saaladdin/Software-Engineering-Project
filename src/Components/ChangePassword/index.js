// ChangePassword.js
import React, { useState } from "react";
import "./index.scss";  // Assuming you'll import SCSS file for styling

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Handle the password change logic
      console.log("Password Changed!");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="change-password-page">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit} className="password-form">
        <div className="form-field">
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
