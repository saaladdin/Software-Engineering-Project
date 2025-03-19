import React from "react";
import { useLocation } from "react-router-dom";
import "./EventDetails.scss"; 

const EventDetails = () => {
  const { state } = useLocation(); 
  const { title, time, location, image, description } = state.event;

  return (
    <div className="event-details-page">
      <img src={image} alt={title} />
      <div className="event-details-text">
      <h1>{title}</h1>
      <p>{description}</p>
      <p><strong>Date:</strong> {time}</p>
      <p><strong>Location:</strong> {location}
      </p>
    </div>
    </div>
  );
};

export default EventDetails;
