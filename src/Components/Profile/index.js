// ProfilePage.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { auth } from "../../FirebaseConfig"; // assuming you're using Firebase
import { signOut } from "firebase/auth";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user:", storedUser); // Debugging log
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log("Parsed user:", user); // Debugging log
        if (user.email) {
          setUserEmail(user.email);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
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
    navigate("/change-password");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const defaultProfilePic = getFirstLetter(userEmail);
  const randomColor = generateRandomColor();

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <div className="profile-picture">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="profile-image"
              style={{ maxWidth: "150px", maxHeight: "150px", borderRadius: "50%" }}
            />
          ) : (
            <div
              className="profile-placeholder"
              style={{
                backgroundColor: randomColor,
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "white",
                margin: "0 auto"
              }}
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

      <h1>Password</h1>

        <button onClick={handleChangePasswordClick} className="change-password-btn">
          Change Password
        </button>


      </div>
    </div>
  );
};

export default ProfilePage;
