import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Landing from  "./Components/Landing"
import Login from "./Components/Login"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route index element={<Landing />}/>
          <Route path="/login" element={<Login />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
