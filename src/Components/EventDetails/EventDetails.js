import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventDetails.scss";

const EventDetails = () => {
  const { state } = useLocation();
  const { title, time, location, image, description, organization, tags } =
    state.event;
  const navigate = useNavigate();

  const tagDisplayMap = {
    "free-food": "Free food",
    "free-stuff": "Free stuff",
  };
    const handleRegisterClick = () => {
      navigate("/confirmation-page", { state: { event: state.event } }); 
  };

  return (
    <div className="eventDetails">
      <div className="eventMainSection">
        <div className="eventImageContainer">
          <img src={image} alt={title} className="eventImage" />
        </div>

        <div className="eventDetailsContent">
          <h1 className="eventTitle">{title}</h1>
          <p className="eventInfo">
            <strong>Date:</strong> {time} <br />
            <strong>Location:</strong> {location}
            <br />
            <strong>Organization:</strong> {organization}
          </p>
          <button className="registerButton" onClick={handleRegisterClick}>
            Register for this event
          </button>

          {tags && tags.length > 0 && (
            <div className="eventTags">
              <p className="tagsLabel">Tags:</p>
              {tags.map((tag, index) => (
                <span key={index} className="eventTag">
                  {tagDisplayMap[tag] || tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {description && (
        <div className="descriptionBox">
          <ul>
            {description
              .split("\n")
              .map((line, index) =>
                line.startsWith("-") ? (
                  <li key={index}>{line.slice(1).trim()}</li>
                ) : (
                  <p key={index}>{line.trim()}</p>
                )
              )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
