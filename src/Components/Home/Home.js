import React, { useContext, useEffect } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import AllOrders from "../AllOrders/AllOrders";
import AllPolls from "../AllPolls/AllPolls";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ViewOrder from "../ViewOrder/ViewOrder";
import About from "../About/About";
import "./style.css";
import { PollsContext } from "../../Context/PollsContext";
import { OrdersContext } from "../../Context/OrdersContext";
import PollsCollection from "../../collections/PollsCollection";
import OrdersCollection from "../../collections/OrdersCollection";
import moment from "moment";
const Home = () => {
  const { polls, dispatch } = useContext(PollsContext);
  const { orders, dispatchOrders } = useContext(OrdersContext);

  const getAllPolls = () => {
    let arrAllPolls = [];

    let today = moment().subtract(1, "days").endOf("day").format();
    let tomorrow = moment().add(1, "days").startOf("day").format();
    PollsCollection.where("created", ">", today.toString())
      .where("created", "<", tomorrow.toString())
      .orderBy("created")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //console.log(moment(doc.data().created).diff(moment(today), "hours"));
          arrAllPolls.push(doc.data());
        });
      });
    dispatch({ type: "ALL_POLLS", payload: { allPolls: arrAllPolls } });

    let arrAllOrders = [];
    OrdersCollection.where("created", ">", today.toString())
      .where("created", "<", tomorrow.toString())
      .orderBy("created")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          arrAllOrders.push(doc.data());
        });
      });
    dispatchOrders({
      type: "ALL_ORDERS",
      payload: { allOrders: arrAllOrders },
    });
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
