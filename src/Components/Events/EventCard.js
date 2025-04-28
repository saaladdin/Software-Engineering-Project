import React from "react";
import "./EventCard.scss";

const EventCard = ({ event, context = "dashboard" }) => {
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
        <img src={event.groupIcon} alt="group icon" className="group-icon" />
      </div>
      <div className="event-details">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-time">
          <strong>Date:</strong> <span>{event.time}</span>
        </p>
        <p className="event-location">
          <strong>Location:</strong> <span>{event.location}</span>
        </p>
        <p className="event-organization">
          <strong>Organization:</strong> <span>{event.organization}</span>
        </p>
      </div>
    </div>
  );
};

export default EventCard;
