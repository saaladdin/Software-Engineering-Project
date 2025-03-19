import React from "react";
import "./EventCard.scss";
import groupIcon from "../../Assets/Images/group icon.png"

const EventCard = ({ event }) => {

  const getRandomShadowColor = () => {
    const colors = [
      "rgba(255, 121, 223, 1)",
      "rgba(255, 247, 79, 1)",
      "rgba(255, 175, 79, 1)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMouseEnter = () => {
    document.documentElement.style.setProperty('--shadow-color', getRandomShadowColor());
  };

  return (
    <div
    className="event-card"
    onMouseEnter={handleMouseEnter}
    >
      <div className="event-image-container">
        <img src={event.image} alt={event.title} className="event-image" />
        <img src={groupIcon} alt="group icon" className="group-icon"/>
      </div>
      <div className="event-details">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
        <p className="event-time">
          <strong>Date:</strong> <span>{event.time}</span>
        </p>
        <p className="event-location">
          <strong>location:</strong> <span>{event.location}</span>
        </p>
      </div>
    </div>
  );
};

export default EventCard;
