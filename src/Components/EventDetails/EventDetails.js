import React from "react";
import { useLocation } from "react-router-dom";
import "./EventDetails.scss";

const EventDetails = () => {
  const { state } = useLocation();
  
  const { title, time, location, image, description, organization, tags } = state.event;

 return (
   <div className="eventDetails">
     <div className="eventImageContainer">
       <img src={image} alt={title} className="event-image" />
     </div>

     <div className="eventDetailsText">
       <h3 className="event-title">{title}</h3>
       <p className="event-time">
         <strong>Date:</strong> {time}
       </p>
       <p className="event-location">
         <strong>Location:</strong> {location}
       </p>
       <p className="event-organization">
         <strong>Organization:</strong> {organization}
       </p>
       <button className="register-button">Register for this event</button>

       {tags && tags.length > 0 && (
         <div className="tags-container">
           {tags.map((tag, index) => (
             <span key={index} className="event-tag">
               {tag}
             </span>
           ))}
         </div>
       )}
     </div>

     {/* Move the description box BELOW the image and details */}
     {description && (
       <div className="description-box">
         <p className="event-description">{description}</p>
       </div>
     )}
   </div>
 );

};

export default EventDetails;
