import React, { useContext, useEffect } from "react";
import { Link, Route, Router, Switch, useHistory } from "react-router-dom";
import AllOrders from "../AllOrders/AllOrders";
import AllPolls from "../AllPolls/AllPolls";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ViewOrder from "../ViewOrder/ViewOrder";
import About from "../About/About";
import "./style.css";
import { PollsContext } from "../../Context/PollsContext";
import { OrdersContext } from "../../Context/OrdersContext";
import { RestaurantsContext } from "../../Context/RestaurantsContext";
import PollsCollection from "../../collections/PollsCollection";
import OrdersCollection from "../../collections/OrdersCollection";
import RestaurantCollection from "../../collections/RestaurantCollection";
import moment from "moment";
import { useCookies } from "react-cookie";
const Home = () => {
  const { polls, dispatch } = useContext(PollsContext);
  const { orders, dispatchOrders } = useContext(OrdersContext);
  const { restaurants, dispatchRestaurants } = useContext(RestaurantsContext);
  const [cookies] = useCookies("user");
  const history = useHistory();

  let today = moment().subtract(1, "days").endOf("day").format();
  let tomorrow = moment().add(1, "days").startOf("day").format();

  const getAllPolls = () => {
    let arrAllPolls = [];

    PollsCollection.where("created", ">", today.toString())
      .where("created", "<", tomorrow.toString())
      .orderBy("created", "desc")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          arrAllPolls.push(doc.data());
        });
      });
    dispatch({ type: "ALL_POLLS", payload: { allPolls: arrAllPolls } });
  };

  const getAllOrders = () => {
    let arrAllOrders = [];
    OrdersCollection.where("created", ">", today.toString())
      .where("created", "<", tomorrow.toString())
      .orderBy("created", "desc")
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

  const getAllRestaurants = () => {
    let arrAllRestaurants = [];
    RestaurantCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        arrAllRestaurants.push(doc.data());
      });
    });
    dispatchRestaurants({
      type: "ALL_RESTAURANTS",
      payload: { allRestaurants: arrAllRestaurants },
    });
  };

  const goToPolls = () => {
    const sec = 1000;
    setTimeout(() => {
      history.push("/home");
    }, sec);
  };

  const update = () => {
    OrdersCollection.doc().onSnapshot(() => {
      getAllOrders();
    });

    PollsCollection.doc().onSnapshot(() => {
      getAllPolls();
    });
  };

  useEffect(() => {
    getAllPolls();
    getAllOrders();
    getAllRestaurants();
    goToPolls();
  }, []);

  return (
    <div className="main">
      <div className="pollButton-container">
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
      </div>

      <Switch>
        <Route component={AllPolls} exact path={["/polls", "/home"]} />
        <PrivateRoute component={AllOrders} exact path="/orders" />
      </Switch>
      <About />
    </div>
  );
};

export default Home;
