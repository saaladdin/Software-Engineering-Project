// ProfilePage.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import db, { auth } from "../../FirebaseConfig"; // assuming you're using Firebase
import { signOut } from "firebase/auth";
import EventCard from "../Events/EventCard";
import { collection, getDocs } from "firebase/firestore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const fileInputRef = useRef(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const events = await getRegisteredEvents(user.uid);
        setRegisteredEvents(events);
        setUserEmail(user.email); // optional, since you had this elsewhere
      }
    });

    return () => unsubscribe();
  }, []);


  const handleEventClick = (event) => {
    navigate("/event-details", { state: { event } });
  };

  const getRegisteredEvents = async (userId) => {

    try {
      const registrationsRef = collection(db, "users", userId, "registrations");
      const querySnapshot = await getDocs(registrationsRef);
      const registeredEvents = querySnapshot.docs.map((doc) => doc.data());

      return registeredEvents;
    } catch (error) {
      console.error("Error fetching registered events:", error);
      return [];
    }
  };

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
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                borderRadius: "50%",
              }}
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
                margin: "0 auto",
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

        <button
          onClick={handleChangePasswordClick}
          className="change-password-btn"
        >
          Change Password
        </button>

          <h1>Registered Events</h1>
        <div className="event-cards">
          {registeredEvents.map((event) => (
            <div
              className="event-card"
              key={event.id}
              onClick={() => handleEventClick(event)}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
