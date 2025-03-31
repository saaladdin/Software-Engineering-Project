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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import EventDetails from "./Components/EventDetails/EventDetails";
import AddPage from "./Components/AddPage";
function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];

  const navigate = useNavigate();
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/addPage" element={<AddPage />} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
