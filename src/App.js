import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import SignUp from "./Components/Signup/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Confirmation from "./Components/Confirmation/Confirmation";
import ForgotPassword from "./Components/ForgotPassword";
import ChangePassword from "./Components/ChangePassword";

import db, { auth } from "./FirebaseConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

import EventDetails from "./Components/EventDetails/EventDetails";
import CreateEvent from "./Components/CreateEvent/CreateEvent";
import eventImage1 from "../src/Assets/Images/onepiececlub.png";
import eventImage2 from "../src/Assets/Images/MikuConcert2.png";
import eventImage3 from "../src/Assets/Images/sarahhh.webp";
import eventImage4 from "../src/Assets/Images/BobaTime.png";
import eventImage5 from "../src/Assets/Images/HostClub.webp";
import eventImage6 from "../src/Assets/Images/AnyaTea.webp";
import eventImage7 from "../src/Assets/Images/Amogus.webp";
import eventImage8 from "../src/Assets/Images/EvanEvent.webp";
import eventImage9 from "../src/Assets/Images/Egoist.webp";
import eventImage10 from "../src/Assets/Images/BadMath.webp";

import onepiece_logo from "../src/Assets/Images/onepiece_logo.png";
import miku_logo from "../src/Assets/Images/miku_logo.png";
import pokemon_logo from "../src/Assets/Images/pokemon_logo.png";
import boba_logo from "../src/Assets/Images/food_logo.png";
import host_logo from "../src/Assets/Images/host_logo.png";
import tea_logo from "../src/Assets/Images/tea_logo.png";
import space_logo from "../src/Assets/Images/space_logo.png";
import robotics_logo from "../src/Assets/Images/robotics_logo.png";
import soccer_logo from "../src/Assets/Images/soccer_logo.png";
import pi_logo from "../src/Assets/Images/pi_logo.png";

import Chat from "./Components/Chat";
import Profile from "./Components/Profile";
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
      groupIcon: onepiece_logo,
      description: `
    Ice Cream Social
      Event Information
      Ahoy, crew! ⚓
      Set sail for a One Piece-themed ice cream adventure! Whether you're a Straw Hat Pirate or a Marine, come feast on delicious frozen treats worthy of a Grand Line voyage.
      
      What's in store? 🍨
      • Devil Fruit-inspired ice cream flavors
      • Pirate-themed toppings & treats
      • One Piece trivia & games
      • Wanted poster photo booth
      • Sea shanties & anime OST vibes
      
      Dress as your favorite character (optional but fun!), bring your nakama, and get ready for a legendary time!
      
      Don’t be a landlubber—join the crew for an adventure of flavors! ⛵`,
    },
    {
      id: 2,
      title: "Miku Concert",
      organization: "Miku Enthusiasts",
      time: "Thursday | March 6 | 2:30 pm",
      location: "Student Center 2C04 - 2nd Floor Lobby",
      tags: [],
      date: "2025-03-06",
      image: eventImage2,
      groupIcon: miku_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 3,
      title: "Pet a Pokémon",
      time: "Thursday | March 6 | 7:00 pm",
      location: "Student Center Room 417",
      tags: ["free-stuff"],
      date: "2025-03-06",
      image: eventImage3,
      groupIcon: pokemon_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 4,
      title: "Poppin' with Boba",
      organization: "Korean Club",
      time: "Friday | March 7 | 12:45 pm",
      location: "Blanton Hall",
      tags: ["free-food"],
      date: "2025-03-07",
      image: eventImage4,
      groupIcon: boba_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 5,
      title: "Host Club Meeting",
      time: "Monday | March 10 | 2:15 pm",
      location: "Music Room 3",
      tags: ["free-food"],
      date: "2025-03-10",
      image: eventImage5,
      groupIcon: host_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 6,
      title: "Tea Party Charity",
      time: "Monday | March 10 | 2:00 pm",
      location: "Student Center 250BC - Ballrooms B and C",
      tags: ["free-food"],
      date: "2025-03-10",
      image: eventImage6,
      groupIcon: tea_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 7,
      title: "Space Talk",
      time: "Monday | March 10 | 8:45 pm",
      location: "Blanton Hall",
      tags: [],
      date: "2025-03-10",
      image: eventImage7,
      groupIcon: space_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 8,
      title: "Robotics Meeting",
      time: "Tuesday | March 12 | 2:45 pm",
      location: "Student Center 250BC - Ballrooms B and C",
      tags: [],
      date: "2025-03-12",
      image: eventImage8,
      groupIcon: robotics_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 9,
      title: "Soccer Tryouts",
      time: "Wednesday | March 13 | 12:30 pm",
      location: "Music Room 3",
      tags: [],
      date: "2025-03-13",
      image: eventImage9,
      groupIcon: soccer_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
    {
      id: 10,
      title: "Math Tutoring",
      time: "Wednesday | March 13 | 2:00 pm",
      location: "Student Center Room 219",
      tags: [],
      date: "2025-03-13",
      image: eventImage10,
      groupIcon: pi_logo,
      description: "Come join the One Piece club for a high seas adventure",
    },
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Prevent duplicate IDs (if you reuse IDs between local & Firestore)
        setEvents((prevEvents) => {
          const firestoreIds = new Set(fetchedEvents.map((ev) => ev.id));
          const filteredLocal = prevEvents.filter(
            (ev) => !firestoreIds.has(ev.id)
          );
          return [...filteredLocal, ...fetchedEvents];
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (newEvent) => {
    try {
      const eventRef = await addDoc(collection(db, "events"), newEvent);
      const eventWithId = { ...newEvent, id: eventRef.id };

      setEvents((prevEvents) => [...prevEvents, eventWithId]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname === "/signup" || location.pathname === "/login") {
          navigate("/Dashboard");
        }
      } else {
        if (location.pathname !== "/signup" && location.pathname !== "/") {
          navigate("/login");
        }
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
        <Route
          path="/dashboard"
          element={<Dashboard events={events} addEvent={addEvent} />}
        />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route
          path="/create-event"
          element={<CreateEvent addEvent={addEvent} />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
