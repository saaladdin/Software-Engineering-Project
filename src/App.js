import './App.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Landing from  "./Components/Landing"
import Login from "./Components/Login"
import SignUp from "./Components/Signup/SignUp";


function App() {

  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];

  return (
    <div className="App">
      {/* 
      Checks if we are not in login page, if we aren't we will
      render the header 
      */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
          <Route index element={<Landing />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />} /> 
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
