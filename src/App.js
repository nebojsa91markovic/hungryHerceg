import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewPoll from "./Components/ViewPoll/ViewPoll";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import PollsContextProvider from "./Context/PollsContext";
import OrdersContextProvider from "./Context/OrdersContext";
import RestaurantsContextProvider from "./Context/RestaurantsContext";
import ViewOrder from "./Components/ViewOrder/ViewOrder";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <PollsContextProvider>
          <OrdersContextProvider>
            <RestaurantsContextProvider>
              <Switch>
                <PrivateRoute
                  component={Home}
                  exact
                  path={["/home", "/polls", "/orders"]}
                />
                <PrivateRoute
                  component={CreatePoll}
                  exact
                  path="/create-poll"
                />
                <PrivateRoute
                  component={CreateOrder}
                  exact
                  path="/create-order"
                />
                <PrivateRoute component={ViewPoll} exact path="/poll/:pollId" />
                <PrivateRoute component={ViewOrder} exact path="/order/:orderId" />
                <Route
                  component={WelcomePage}
                  exact
                  path={["/", "/signup", "/login"]}
                />
              </Switch>
            </RestaurantsContextProvider>
          </OrdersContextProvider>
        </PollsContextProvider>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
