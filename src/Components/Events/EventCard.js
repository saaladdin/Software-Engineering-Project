import React from "react";
import "./EventCard.scss";

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
        <img src={event.imageUrl} alt={event.title} className="event-image"/>

        <div className="event-details">
            <h3 className="event-title">{event.title</h3>
            <p className="event-description">{event.description}</p>
            <p className="event-time">{new Date(event.date).toLocaleString()}</p>
        </div>
    </div>
    );
};

export default EventCard;