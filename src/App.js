import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import SignUp from "./Components/Signup/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Confirmation from "./Components/Confirmation/Confirmation";
import { auth } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import EventDetails from "./Components/EventDetails/EventDetails";
import AddEvent from "./Components/AddPage";
import CreateEvent from "./Components/CreateEvent/CreateEvent";
import eventImage1 from "../src/Assets/Images/Group 11.png";
import eventImage2 from "../src/Assets/Images/MikuConcert2.png"
import eventImage3 from "../src/Assets/Images/sarahhh.webp";
import eventImage4 from "../src/Assets/Images/BobaTime.png";
import eventImage5 from "../src/Assets/Images/HostClub.webp";
import eventImage6 from "../src/Assets/Images/AnyaTea.webp";
import eventImage7 from "../src/Assets/Images/Amogus.webp";
import eventImage8 from "../src/Assets/Images/EvanEvent.webp";
import eventImage9 from "../src/Assets/Images/Egoist.webp";
import eventImage10 from "../src/Assets/Images/BadMath.webp";

import Chat from "./Components/Chat";
function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];

  const navigate = useNavigate();
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Ice Cream Social",
      time: "Wednesday | March 5 | 12:45 pm",
      location: "Student Center Ballrooms",
      organization: "One Piece Club",
      tags: ["free-food"],
      date: "2025-03-05",
      startTime: "12:45",
      endTime: "14:00",
      image: eventImage1,
      description: "hi"
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
  ]);
  
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname === "/signup" || location.pathname === "/login") {
          navigate("/Dashboard");}
        }
        else{
          if (location.pathname !== "/signup" && location.pathname !== "/"){
            navigate("/login")}
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard events={events} addEvent={addEvent} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/create-event" element={<CreateEvent addEvent={addEvent}/>} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;