import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import moment from "moment";

const PollItem = ({ poll }) => {
  const [timeLeft, setTimeLeft] = useState(
    moment(poll.created).add(2, "hours").fromNow()
  );
  return (
    <Link className="pollItem" to={`/poll/${poll.id}`}>
      <h3>{poll.label}</h3>
      <span>{moment(poll.created).format("DD/MM")}</span>
      <span>{timeLeft}</span>
      <span>{poll.isOrderCreated ? "Order created" : "Not yet!"}</span>
    </Link>
  );
};

export default PollItem;
