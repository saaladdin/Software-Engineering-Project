import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import messenger from "../../Assets/Images/noun-group-chat-5076902 1.png";
import add_event from "../../Assets/Images/AddEvent.png";
import logo from "../../Assets/Images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [showChangeBox, setShowChangeBox] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const fileInputRef = useRef(null);
  const changeBoxRef = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        setIsScrolledDown(true);
      } else {
        setIsScrolledDown(false);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        changeBoxRef.current &&
        !changeBoxRef.current.contains(event.target)
      ) {
        setShowChangeBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setShowChangeBox(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProfilePicClick = () => {
    if (!profilePic) {
      setShowChangeBox(true);
    } else {
      setShowChangeBox(!showChangeBox);
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
  const defaultProfilePic = getFirstLetter(userEmail);
  const randomColor = generateRandomColor();

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleTitleClick = () => {
    navigate("/dashboard");
  };

  const handleAddEventClick = () => {
    navigate("/addevent");
  };

  const handleChatClick = () => {
    navigate("/Chat");
  };

  return (
    <header className={`rainbow-header ${isScrolledDown ? "hide-header" : ""}`}>
      <div className="headerLogo">
        <img
          src={logo}
          alt="Website Logo"
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
        <h3
          style={{ color: "#000000", textAlign: "left", cursor: "pointer" }}
          onClick={handleTitleClick}
        >
          UVent
        </h3>
      </div>
      <div className="headerRight">
        <a href="/profile">
            Profile
        </a>
        <div
          className="profile-pic-container"
          onClick={handleProfilePicClick}
          style={{ cursor: "pointer" }}
        >
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div
              className="profile-pic-default"
              style={{ backgroundColor: randomColor }}
            >
              {defaultProfilePic}
            </div>
          )}
        </div>
        {showChangeBox && (
          <div className="change-profile-box" ref={changeBoxRef}>
            <button onClick={handleButtonClick} className="change-profile-btn">
              Change Profile Picture
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="profile-pic-upload"
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <img
          src={messenger}
          alt="messenger"
          className="text-bubble"
          onClick={handleChatClick}
          style={{ cursor: "pointer" }}
        />
        <img
          src={add_event}
          alt="add_event"
          className="plus-sign"
          onClick={handleAddEventClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </header>
  );
};

export default Header;
