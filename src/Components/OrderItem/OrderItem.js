import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.css";

const OrderItem = ({ order, id }) => {
  const finishAt = moment(order.created).add(30, "minutes");
  const [timeLeft] = useState(finishAt.fromNow());

  const haveIOrdered = () => {
    let bool = false;

    order.allMeals.forEach((customer) => {
      if (customer.consumer === id) {
        bool = true;
      }
    });
    return bool;
  };

  return (
    <Link className="orderItem" to={`/order/${order.restaurantId}`}>
      <h3>{order.label}</h3>
      <span>{timeLeft}</span>
      <span>{haveIOrdered() ? "You have ordered" : "Not yet!"}</span>
    </Link>
  );
};

export default OrderItem;
