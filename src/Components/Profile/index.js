import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import db, { auth } from "../../FirebaseConfig";
import { signOut } from "firebase/auth";
import EventCard from "../Events/EventCard";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const fileInputRef = useRef(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail(user.email);
        const events = await getRegisteredEvents(user.uid);
        setRegisteredEvents(events);

        // 🔽 Fetch profilePic from Firestore
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            if (data.profilePic) {
              setProfilePic(data.profilePic);
            }
          }
        } catch (error) {
          console.error("Error fetching user profile pic:", error);
        }
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

      const registeredEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return registeredEvents;
    } catch (error) {
      console.error("Error fetching registered events:", error);
      return [];
    }
  };

  const removeRegisteredEvent = async (eventId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      const eventRef = doc(db, "users", userId, "registrations", eventId);
      await deleteDoc(eventRef);

      setRegisteredEvents((prev) =>
        prev.filter((event) => event.id !== eventId)
      );

      console.log("Event removed from registrations.");
    } catch (error) {
      console.error("Error removing event:", error);
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        // You may want to upload to Firebase Storage and save URL to Firestore here
      };
      reader.readAsDataURL(file);
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
            <div className="event-card" key={event.id}>
              <button
                className="remove-button"
                onClick={() => removeRegisteredEvent(event.id)}
                aria-label="Remove event"
              >
                &times;
              </button>

              <EventCard
                event={event}
                onClick={() => handleEventClick(event)}
              />
            </div>
          ))}
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
