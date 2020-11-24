import React, { useContext, useEffect } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import AllOrders from "../AllOrders/AllOrders";
import AllPolls from "../AllPolls/AllPolls";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ViewOrder from "../ViewOrder/ViewOrder";
import About from "../About/About";
import "./style.css";
import { PollsContext } from "../../Context/PollsContext";
import PollsCollection from "../../collections/PollsCollection";

const Home = () => {
  const { polls, dispatch } = useContext(PollsContext);

  const getAllPolls = () => {
    let arrAllPolls = [];

    PollsCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        arrAllPolls.push(doc.data());
      });
    });
    dispatch({ type: "ALL_POLLS", payload: { allPolls: arrAllPolls } });
  };

  useEffect(() => {
    getAllPolls();
  }, []);
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
