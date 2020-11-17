import React from "react";
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import WelcomePage from "./Components/WelcomePage/WelcomePage";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <WelcomePage />
    </div>
  );
}

export default App;
