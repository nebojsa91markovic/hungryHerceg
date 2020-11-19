import React from "react";
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ViewPoll from "./Components/ViewPoll/ViewPoll";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <WelcomePage />
        <Home />
        <Footer />
        <Switch>
          <Route exact path='/newPoll'>
            <CreatePoll />
          </Route>
          <Route path='/poll/:pollId'>
            <ViewPoll />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
