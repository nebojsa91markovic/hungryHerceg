import React from "react";
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <WelcomePage />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
