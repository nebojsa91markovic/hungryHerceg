import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.css";

const OrderItem = ({ order, id, index }) => {
  const finishAt = moment(order.created).add(30, "minutes");
  const [timeLeft, setTimeLeft] = useState(finishAt.fromNow());

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
      {/* <h3>Name: {order.label}</h3>
            <span>Status: {order.active + ''}</span> */}
      <span className='span-orderLabel'>{order.label}</span>
      {/* <span>{moment(order.created).format("DD/MM")}</span> */}
      <span>{timeLeft}</span>
      <span>{haveIOrdered() ? "You have ordered" : "Not yet!"}</span>
    </Link>
  );
};

export default OrderItem;
