import React from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import AllOrders from "../AllOrders/AllOrders";
import AllPolls from "../AllPolls/AllPolls";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ViewOrder from "../ViewOrder/ViewOrder";
import About from "../About/About";
import "./style.css";

const Home = () => {
  return (
    <div className="main">
      <Link className="pollButton" to="/polls">
        Active Polls
      </Link>
      <Link className="pollButton" to="/create-poll">
        Create Poll
      </Link>
      <Link className="pollButton" to="/orders">
        Active Orders
      </Link>
      <Link className="pollButton" to="/create-order">
        Create Order
      </Link>

      <Switch>
        <Route component={AllPolls} exact path="/polls" />
        <PrivateRoute component={AllOrders} exact path="/orders" />
      </Switch>
      <ViewOrder />
      <About />
    </div>
  );
};

export default Home;
