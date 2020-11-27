import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.css";
import { v4 as uuidv4 } from "uuid";

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

  const isItFinished = () => {
    if (!order.active) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Link key={uuidv4()} className="orderItem" to={!isItFinished() ? `/order/${order.id}` : '/orders'}>
      <h3>{order.label}</h3>
      <span>{timeLeft}</span>
      <span>{isItFinished() ? "Order is created" : "Not yet!"}</span>
    </Link>
  );
};

export default OrderItem;
