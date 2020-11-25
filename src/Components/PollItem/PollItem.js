import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import moment from "moment";

const PollItem = ({ poll }) => {
  const finishAt = moment(poll.created).add(30, "minutes");

  const [timeLeft, setTimeLeft] = useState(finishAt.fromNow());

  const handleTimeLeft = () => {
    const sec = 1000;
    if (moment().isBefore(finishAt)) {
      setTimeout(() => setTimeLeft(finishAt.fromNow()), sec * 60);
    }
  };

  useEffect(() => {
    handleTimeLeft();
  }, []);

  return (
    <Link className="pollItem" to={`/poll/${poll.id}`}>
      <span className="span-label">{poll.label}</span>
      <span>{moment(poll.created).format("DD/MM")}</span>
      <span>{timeLeft}</span>
      <span>{poll.isOrderCreated ? "Order created" : "Not yet!"}</span>
    </Link>
  );
};

export default PollItem;
