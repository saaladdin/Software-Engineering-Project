import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../Events/EventCard";
import "./Dashboard.scss";
import { auth } from "../../FirebaseConfig";

const Dashboard = ({ events }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [startTime, setStartTime] = useState("08:00");
    const [endTime, setEndTime] = useState("23:00");

    const formatTime = (hour) => {
      const isPM = hour >= 12;
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour} ${isPM ? 'PM' : 'AM'}`;
    };
    
    const today = new Date().toISOString().split("T")[0];

    const filterByTimeRange =(event) => {
      if(!event.startTime || !event.endTime){
        return true;
      }
      const [startHour, startMinute] = startTime.split(":");
      const [endHour, endMinute] = endTime.split(":");
      const [eventStartHour, eventStartMinute] = event.startTime.split(":");
      const [eventEndHour, eventEndMinute] = event.endTime.split(":");

      const selectedStart = parseInt(startHour) * 60 + parseInt(startMinute);
      const selectedEnd = parseInt(endHour) * 60 + parseInt(endMinute);
      const eventStart = parseInt(eventStartHour) * 60 + parseInt(eventStartMinute);
      const eventEnd = parseInt(eventEndHour) * 60 + parseInt(eventEndMinute);
      return eventStart >= selectedStart && eventEnd <= selectedEnd;
    };

    const filteredEvents = events.filter((event) => {
            if (
              selectedFilter === "free-food" && !event.tags.includes("free-food")) {
              return false;
            }
            if (selectedFilter === "free-stuff" && !event.tags.includes("free-stuff")) {
              return false;
            }
            if (selectedFilter === "past") {
                return event.date < today;
            }
            if (selectedFilter === "upcoming") {
                return event.date >=today;
            }
            return true;
        })
        .filter((event) => {
            if (searchQuery.trim() === ""){
                 return true;
            }
        return (
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    })
    .filter((event) => filterByTimeRange(event));

    const handleEventClick = (event) => {
      navigate("/event-details", { state: { event }})
    };

    return (
      <div className="dashboard">
        <h1 style={{ color: "#FFA500", textAlign: "center" }}>
          Welcome to UVent!
        </h1>

        <div className="filter-buttons">
          <button onClick={() => setSelectedFilter("")}>All Events</button>
          <button onClick={() => setSelectedFilter("free-food")}>Free Food</button>
          <button onClick={() => setSelectedFilter("free-stuff")}>Free Stuff</button>
          <button onClick={() => setSelectedFilter("past")}>View Past Events</button>
          <button onClick={() => setSelectedFilter("upcoming")}>View Upcoming Events</button>
        </div>

        <div className="time-filter">
          <label>
            Start Time:
            <select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
              {Array.from({length:16}, (_, index) => {
                const hour = 8 + index;
                return(
                <option key={hour} value={`${String(hour).padStart(2, "0")}:00`}>
                  {formatTime(hour)}
                </option>
                );
              })}
            </select>
          </label>

          <label>
            End Time:
            <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
              {Array.from({length:16}, (_, index) => {
                const hour = 8 + index;
                return(
                <option key={hour} value={`${String(hour).padStart(2, "0")}:00`}>
                  {formatTime(hour)}
                </option>
                );
              })}
            </select>
          </label>
        </div>
        <input
          type="text"
          placeholder="Search for events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />

        <div className="event-list">
          {filteredEvents.map((event) => (
            <div
            key={event.id}
            onClick={() => handleEventClick(event)}
            className="event-card-container"
            >
            <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    );
};

export default Dashboard;