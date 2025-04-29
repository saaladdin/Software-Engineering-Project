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
    organization: "Colorful Stage",
    tags: [],
    date: "2025-03-06",
    startTime: "14:30",
    endTime: "17:00",
    image: eventImage2,
    groupIcon: miku_logo,
    description: `
    Miku Concert
    Event Information
    
    🎤✨ Calling all Vocaloid fans! ✨🎶
    Get ready to step into a world of neon lights, futuristic beats, and digital dreams at our Hatsune Miku Concert! Whether you're a longtime fan or just tuning in, this is your chance to celebrate Miku in style.
    
    Come vibe with fellow fans, show off your best Miku-inspired outfits, and immerse yourself in a night of music, fun, and unforgettable memories! Bring your glow sticks, your rhythm game skills, and your love for all things Vocaloid—let's make this a night worthy of the virtual diva herself! 💜🎶

    Hashtags:
    #MikuMagic
    #VocaloidVibes
    #FutureIsNow
    `,
  },
  {
    id: 3,
    title: "Pet a Pokémon",
    time: "Thursday | March 6 | 2:30 pm",
    location: "Student Center Room 417",
    organization: "Pokémon League",
    tags: ["free-stuff"],
    date: "2025-03-06",
    startTime: "14:30",
    endTime: "17:00",
    image: eventImage3,
    groupIcon: pokemon_logo,
    description: `
    Pet a Pokémon
    Event Information
    
    ✨⚡ Calling all Pokémon Trainers! ✨⚡

    Have you ever wanted to pet, cuddle, and interact with real-life Pokémon? Now’s your chance! Step into a world where Pokémon come to life at our Pokémon Petting Park—a heartwarming event where you can meet and bond with some of the friendliest Pokémon around!

    💛 Feel the fluff of a sleepy Snorlax
    💙 Give belly rubs to a playful Eevee
    ❤️ Watch Pikachu’s cheeks spark with excitement
    💚 Snap the perfect photo with your new Poké-pals

    Whether you're looking to relax, de-stress, or just experience the magic of Pokémon up close, this event is for Trainers of all ages. So grab your Pokédex, bring your fellow Trainers, and get ready for an unforgettable, feel-good encounter!
    `,
  },
  {
    id: 4,
    title: "Poppin' with Boba",
    organization: "Korean Club",
    time: "Friday | March 7 | 12:45 pm",
    location: "Blanton Hall",
    organization: "Food Club",
    tags: ["free-food"],
    date: "2025-03-07",
    startTime: "12:45",
    endTime: "14:20",
    image: eventImage4,
    groupIcon: boba_logo,
    description: `
    Poppin’ with Boba
    Event Information 🍦
    
    🥤✨ Boba Lovers Unite! ✨🥤

    Craving something sweet and refreshing? Join us at the Dessert Club Boba Hangout for an afternoon filled with endless boba flavors, delicious snacks, and great conversations. Whether you're a boba veteran or a first-timer, this is the perfect spot to relax, sip your favorite drink, and meet fellow dessert lovers.
    
    What’s on the menu?
    ✌️ A variety of boba drinks to satisfy every taste
    🍩 Tasty treats to complement your drink
    🐻 Fun games and challenges to keep the energy high
    💬 Plenty of time to chat, connect, and share your favorite boba experiences
    🎉 Boba challenges – Who can finish a giant cup first?

    Come for the boba, stay for the company, and let’s make this a hangout you won’t forget!
    `,
  },
  {
    id: 5,
    title: "Host Club Meeting",
    time: "Monday | March 10 | 2:15 pm",
    location: "Music Room 3",
    organization: "Host Club",
    tags: ["free-food"],
    date: "2025-03-10",
    startTime: "14:15",
    endTime: "16:15",
    image: eventImage5,
    groupIcon: host_logo,
    description: `
    Host Club Meeting
    Event Information
    
    🎉🎀 Welcome Ladies! 🎀🎉

    The Ouran High School Host Club cordially invites you to a most exquisite gathering, where elegance, charm, and sophistication meet in perfect harmony.

    What awaits you, dear guests?
    💖 A night of unparalleled charm with our very own hosts, including the dashing Tamaki, the mysterious Kyoya, the adorable Hikaru & Kaoru, and the sweet Mori & Honey.
    💫 Custom-tailored experiences – Allow us to entertain you in the most captivating ways, just for you.
    🍰 Delectable desserts handpicked to delight your palate.
    🎵 Soft piano music and delightful conversations, perfect for any mood.
    ✨ Surprise performances that will leave you absolutely enchanted!

    Come indulge in the finest of everything, dear guests, and let us make this a night to remember—because the Host Club is here to ensure your heart races and your spirits soar.

    No matter your taste, there’s a host here for you.

    Your devoted hosts,
    The Ouran High School Host Club 🌹
    `,
  },
  {
    id: 6,
    title: "Tea Party Charity",
    time: "Monday | March 10 | 8:15 am",
    location: "Student Center 250BC - Ballrooms B and C",
    organization: "Charity Club",
    tags: ["free-food"],
    date: "2025-03-10",
    startTime: "8:15",
    endTime: "11:15",
    image: eventImage6,
    groupIcon: tea_logo,
    description: `
    Tea Party Charity
    Event Information 🍵✨

    🍵✨ A Heartwarming Afternoon Awaits! ✨🍵

    Join us for an elegant and meaningful Tea Party Charity event hosted at the serene Central City Gardens. This special gathering aims to support children's education and welfare in underserved communities.

    Highlights of the event:
    • Fine teas and exquisite pastries served by our gracious hosts
    • Charity auction featuring exclusive items and experiences
    • An opportunity to contribute to a noble cause while enjoying an enchanting atmosphere

    Your presence will help us make the world brighter, one cup of tea at a time. Dress to impress and prepare for an afternoon filled with intrigue, kindness, and unforgettable moments.

    RSVP
    Register for this event
    `,
  },
  {
    id: 7,
    title: "Space Talk",
    time: "Monday | March 10 | 8:45 pm",
    location: "Blanton Hall",
    organization: "Astronomy Club",
    tags: [],
    date: "2025-03-10",
    startTime: "20:45",
    endTime: "22:30",
    image: eventImage7,
    groupIcon: space_logo,
    description: `
    Space Talk
    Event Information
    
    🌌🚀 Join Us for a Cosmic Conversation! 🌌🚀
    
    Ever wondered what's out there in the vastness of space? Come gather with us for a "Space Talk" where we explore the latest discoveries, mysterious anomalies, and exciting findings from the universe!
    
    What to Expect:
    🔭 Cutting-edge research on space exploration, black holes, and distant galaxies
    🧑‍🚀 Expert scientists and researchers sharing their thrilling new discoveries
    🛸 Discussions about the future of space travel and potential life beyond Earth
    🛰️ Live Q&A sessions where you can ask the experts your questions
    
    🌠 Come for the knowledge, stay for the cosmic connections, and let’s journey through the stars together—no need to watch out for any sus activity!
    
    #SpaceTalk #ResearchFindings #ExploringTheUniverse
    `,
  },
  {
    id: 8,
    title: "Robotics Meeting",
    time: "Tuesday | March 12 | 1:45 pm",
    location: "Student Center 250BC - Ballrooms B and C",
    organization: "Robotics Club",
    tags: [],
    date: "2025-03-12",
    startTime: "13:45",
    endTime: "15:30",
    image: eventImage8,
    groupIcon: robotics_logo,
    description: `
    🤖✨ Welcome to the Future of Robotics! ✨🤖
    
    Step into the world of Neon Genesis Evangelion with our exclusive event where experts build real-life mechs inspired by the iconic Evas! And as a special treat, we have a guest appearance by Misato Katsuragi herself, to guide us through the world of Evas and the future of robotics.
    
    What to Expect:
    🛠 Live mech-building demos inspired by Evangelion
    🎤 Misato's exclusive talk on mechs and piloting
    🤖 Robot battles and interactive workshops
    
    Don’t miss this unique opportunity to explore the world of robotics and learn from the best. Come for the mechs, stay for the excitement—sync up with us for a truly epic event!
    `,
  },
  {
    id: 9,
    title: "Soccer Tryouts",
    time: "Wednesday | March 13 | 12:30 pm",
    location: "Music Room 3",
    organization: "Soccer Club",
    tags: [],
    date: "2025-03-13",
    startTime: "12:30",
    endTime: "14:30",
    image: eventImage9,
    groupIcon: soccer_logo,
    description: `
    Soccer Tryouts
    Event Information
    
    Are you ready to show off your skills and join the team?
    
    Come out to our Soccer Tryouts and prove what you’ve got! Whether you’re a seasoned player or looking to take your game to the next level, we want to see your talent on the field.

    What to Expect:
    💥 Intense drills to showcase your skills
    ⚽ Scrimmages to test your game-time strategies
    👟 Meet the coaches and learn about the team
    🏆 Opportunities to make the team and earn a spot for the season

    What to Bring:
    ✅ Comfortable soccer cleats
    ✅ Shin guards for safety
    ✅ Water bottle to stay hydrated
    ✅ Sportswear (comfortable and breathable)

    Bring your best game and come ready to play—let’s kick things off together!
    `,
  },
  {
    id: 10,
    title: "Math Tutoring",
    time: "Wednesday | March 13 | 4:00 pm",
    location: "Student Center Room 219",
    organization: "Soccer Club",
    tags: [],
    date: "2025-03-13",
    startTime: "16:00",
    endTime: "18:15",
    image: eventImage10,
    groupIcon: pi_logo,
    description: `
Sanrio Math Tutoring
Event Information

Get ready to tackle math problems with some extra cuteness! Our Math Tutoring Event is here to help you improve your skills, with the added fun of Sanrio characters cheering you on. Whether you’re struggling with equations or just want to sharpen your math abilities, we've got you covered!

What to Expect:
➕ Personalized math tutoring in a relaxed and fun environment
🎀 Sanrio-themed activities to keep things light and enjoyable
✏️ Free Sanrio-themed pencil for all attendees (because who wouldn’t want a little Hello Kitty motivation?)
💡 Problem-solving tips to help you conquer math with confidence

Bring your math challenges, and let’s make learning as cute and fun as it is rewarding! Plus, everyone gets to leave with a special Sanrio gift to keep the good vibes going!
`,
  },
]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname === "/signup" || location.pathname === "/login") {
          navigate("/Dashboard");
        }
      } else {
        if (location.pathname !== "/signup" && location.pathname !== "/" && location.pathname !== "/forgotpassword") {
          navigate("/login");
        }
<<<<<<< HEAD
        else{
          if (location.pathname !== "/signup" && location.pathname !== "/" && location.pathname !== "/forgotpassword"){
            navigate("/login")}
=======
>>>>>>> 3371c831f0d39206f69a39661cea6f78513dc55e
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
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
