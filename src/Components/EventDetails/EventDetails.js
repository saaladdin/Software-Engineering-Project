import React from "react";
import { useLocation } from "react-router-dom";
import "./EventDetails.scss";

const EventDetails = () => {
  const { state } = useLocation();
  const { title, time, location, image, description, organization, tags } =
    state.event;

  const tagDisplayMap = {
    "free-food": "Free food",
    "free-stuff": "Free stuff",
  };

  return (
    <div className="event-details-page">
      <div className="event-main-section">
        <div className="event-image-container-details">
          <img src={image} alt={title} className="event-image-details" />
        </div>

        <div className="event-details-content">
          <h1 className="event-title-details">{title}</h1>
          <p className="event-info-details">
            <strong>Date:</strong> {time} <br />
            <strong>Location:</strong> {location} <br />
            <strong>Organization:</strong> {organization}
          </p>

          <button className="register-button">Register for this event</button>

          {tags && tags.length > 0 && (
            <div className="event-tags">
              <p className="tags-label">Tags:</p>
              {tags.map((tag, index) => (
                <span key={index} className="event-tag">
                  {tagDisplayMap[tag] || tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {description && (
        <div className="description-box">
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
