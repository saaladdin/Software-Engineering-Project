import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        time: "",
        image: null,
    });
    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setNewEvent({ ...newEvent, [name]: value});
    };
    const handleImageUpload = (e) => {
        setNewEvent({ ...newEvent, image: e.target.files[0]});
    };
    const toggleUploadForm = () => {
        setShowUploadForm(!showUploadForm);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newEvent.title && newEvent.description && newEvent.time && newEvent.image){
            const eventData = { ...newEvent, id: Date.now()};
            setEvents([...events, eventData]);
            setShowUploadForm(false);
        } else {
            alert("Please fill all fields and upload an image.");
        }
    };
    useEffect(() => {
        const fetchedEvents = [
          {
            id: 1,
            title: "Anime WatchParty",
            description: "Join us to watch all your favorite animes!",
            time: "2025-03-01T18:00:00Z",
            image: "https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg",
          },
        ];
        setEvents(fetchedEvents);
    }, []);
    return (
      <div className="dashboard">
        <h1 style={{ color: "#FFA500", textAlign: "center" }}>
          Welcome to UVENT!
        </h1>
        <p>
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#ff79df", cursor: "pointer", fontWeight: "bold" }}
          >
            Logout
          </span>
        </p>
        <button onClick={toggleUploadForm} className="upload-btn">
          {showUploadForm ? "Cancel" : "Upload New Event"}
        </button>
        {showUploadForm && (
            <form onSubmit={handleFormSubmit} className="upload-form">
                <input 
                type="text"
                name="title"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={handleInputChange}
                />
                <textarea
                name="description"
                placeholder="Event Description"
                value={newEvent.description}
                onChange={handleInputChange}
                />
                <input
                type="datetime-local"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                />
                <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                />
                <button type="submit" className="submit-btn">Submit Event</button>
            </form>
        )}
        <div className="event-list">
            {events.map((event) => (
                <div key={event.id} className="event-card">
                    <img
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                    />
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p>{new Date(event.time).toLocaleString()}</p>
                    </div>
                    ))}
                    </div>
                    </div>
                    );
                };
                export default Dashboard;
