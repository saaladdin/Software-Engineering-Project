import React, {useEffect, useRef, useState} from "react";
import "./index.scss"
import messenger from "../../Assets/Images/noun-group-chat-5076902 1.png";

const Header = () => {
    const[profilePic, setProfilePic] = useState(null);
    const [userEmail, setUserEmail] =useState("");
    const [showChangeBox, setShowChangeBox] = useState(false);
    const fileInputRef = useRef(null);
    const changeBoxRef = useRef(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser){
            const user = JSON.parse(storedUser);
            setUserEmail(user.email);
        }
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (changeBoxRef.current && !changeBoxRef.current.contains(event.target)){
                setShowChangeBox(false)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    },[]);

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setShowChangeBox(false);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleProfilePicClick = () => {
        if(!profilePic){
            setShowChangeBox(true);
        }else{
        setShowChangeBox(!showChangeBox)
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current){
            fileInputRef.current.click();
        }
    };

    const getFirstLetter = (email) => {
        return email ? email.split('@')[0].charAt(0).toUpperCase() : '';
    };
    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = '#';
        for (let i = 0; i < 6; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const defaultProfilePic = getFirstLetter(userEmail);
    const randomColor = generateRandomColor();
  
    return (
      <header className="rainbow-header">
        <h2 style={{ color: "#000000", textAlign: "left" }}>Uvent</h2>
        <div 
        className="profile-pic-container"
        onClick={handleProfilePicClick}
        style={{cursor: 'pointer'}}
        >
        {profilePic ? (
            <img
            src={profilePic}
            alt="Profile"
            className="profile-pic"
            />
        ) : (
            <div 
            className="profile-pic-default"
            style = {{ backgroundColor: randomColor}}
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
        type ="file"
        accept="image/*"
        onChange={handleProfilePicChange}
        className="profile-pic-upload"
        ref={fileInputRef}
        style={{ display: "none"}}
        />
        <img
          src={messenger}
          alt="messenger"
          className="text-bubble"
        />
      </header>
    );
}

export default Header;