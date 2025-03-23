import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../Events/EventCard";
import "./Dashboard.scss";

import eventImage1 from "../../Assets/Images/Group 11.png"
import eventImage2 from "../../Assets/Images/Group 11.png"
import eventImage3 from "../../Assets/Images/PetAPokemon.png";
import eventImage4 from "../../Assets/Images/Poppin' with Boba.png";
import eventImage5 from "../../Assets/Images/Host Club Meeting.png";
import eventImage6 from "../../Assets/Images/Tea Party Charity.png";
import eventImage7 from "../../Assets/Images/Space Talk.png";
import eventImage8 from "../../Assets/Images/Robotics Meeting.png";
import eventImage9 from "../../Assets/Images/Soccer Tryouts.png";
import eventImage10 from "../../Assets/Images/Math Tutoring.png";


const Dashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");


    useEffect(() => {
        const fetchedEvents = [
          {
            id: 1,
            title: "Ice Cream Social",
            time: "Wednesday | March 5 | 12:45 pm",
            location: "Student Center Ballrooms",
            organization: "Ice Cream Club",
            tags: ["free-food"],
            date: "2025-03-05",
            image: eventImage1,
          },
          {
            id: 2,
            title: "Miku Concert",
            time: "Thursday | March 6 | 2:30 pm",
            location: "Student Center 2C04 - 2nd Floor Lobby",
            tags: [],
            date: "2025-03-06",
            image: eventImage2,
          },
          {
            id: 3,
            title: "Pet a Pokémon",
            time: "Thursday | March 6 | 7:00 pm",
            location: "Student Center Room 417",
            tags: ["free-stuff"],
            date: "2025-03-06",
            image: eventImage3,
          },
          {
            id: 4,
            title: "Poppin' with Boba",
            time: "Friday | March 7 | 12:45 pm",
            location: "Blanton Hall",
            tags: ["free-food"],
            date: "2025-03-07",
            image: eventImage4,
          },
          {
            id: 5,
            title: "Host Club Meeting",
            time: "Monday | March 10 | 2:15 pm",
            location: "Music Room 3",
            tags: ["free-food"],
            date: "2025-03-10",
            image: eventImage5,
          },
          {
            id: 6,
            title: "Tea Party Charity",
            time: "Monday | March 10 | 2:00 pm",
            location: "Student Center 250BC - Ballrooms B and C",
            tags: ["free-food"],
            date: "2025-03-10",
            image: eventImage6,
          },
          {
            id: 7,
            title: "Space Talk",
            time: "Monday | March 10 | 8:45 pm",
            location: "Blanton Hall",
            tags: [],
            date: "2025-03-10",
            image: eventImage7,
          },
          {
            id: 8,
            title: "Robotics Meeting",
            time: "Tuesday | March 12 | 2:45 pm",
            location: "Student Center 250BC - Ballrooms B and C",
            tags: [],
            date: "2025-03-12",
            image: eventImage8,
          },
          {
            id: 9,
            title: "Soccer Tryouts",
            time: "Wednesday | March 13 | 12:30 pm",
            location: "Music Room 3",
            tags: [],
            date: "2025-03-13",
            image: eventImage9,
          },
          {
            id: 10,
            title: "Math Tutoring",
            time: "Wednesday | March 13 | 2:00 pm",
            location: "Student Center Room 219",
            tags: [],
            date: "2025-03-13",
            image: eventImage10,
          },
        ];
        setEvents(fetchedEvents);
    }, []);
    
    const today = new Date().toISOString().split("T")[0];

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
    });

    const handleEventClick = (event) => {
      navigate("/event-details", { state: { event }})
    };

    return (
      <div className="dashboard">
        <h1 style={{ color: "#FFA500", textAlign: "center" }}>
          Welcome to UVent!
        </h1>
        <p>
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#ff79df", cursor: "pointer", fontWeight: "bold" }}
          >
            Logout
          </span>
        </p>

        <div className="filter-buttons">
          <button onClick={() => setSelectedFilter("")}>All Events</button>
          <button onClick={() => setSelectedFilter("free-food")}>Free Food</button>
          <button onClick={() => setSelectedFilter("free-stuff")}>Free Stuff</button>
          <button onClick={() => setSelectedFilter("past")}>View Past Events</button>
          <button onClick={() => setSelectedFilter("upcoming")}>View Upcoming Events</button>
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