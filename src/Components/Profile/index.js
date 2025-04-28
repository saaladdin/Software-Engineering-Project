import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFirstLetter = (email) => {
    return email ? email.split("@")[0].charAt(0).toUpperCase() : "";
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleChangePasswordClick = () => {
    navigate("/change-password"); // You need to have this route created
  };

  const defaultProfilePic = getFirstLetter(userEmail);
  const randomColor = generateRandomColor();

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <div className="profile-picture">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-image" />
          ) : (
            <div
              className="profile-placeholder"
              style={{ backgroundColor: randomColor }}
            >
              {defaultProfilePic}
            </div>
          )}
        </div>
        <button onClick={handleButtonClick} className="change-pfp-btn">
          Change Profile Picture
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <div className="user-details">
          <p><strong>Email:</strong> {userEmail}</p>
        </div>
        <button onClick={handleChangePasswordClick} className="change-password-btn">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
