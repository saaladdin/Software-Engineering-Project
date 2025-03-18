import React from "react";
import { useLocation } from "react-router-dom";
import "./EventDetails.scss"; 

const EventDetails = () => {
  const { state } = useLocation(); 
  const { title, time, location, image, description } = state.event;

  return (
    <div className="event-details-page">
      <h1>{title}</h1>
      <img src={image} alt={title} />
      <p>{description}</p>
      <p>
        <strong>Date:</strong> {time}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
    </div>
  );
};

export default EventDetails;
