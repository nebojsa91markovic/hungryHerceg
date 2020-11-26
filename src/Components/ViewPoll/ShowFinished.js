import React, { useState, useContext } from "react";
import { PollsContext } from "../../Context/PollsContext";
import "./style.css";
import { useHistory } from "react-router-dom";

const ShowFinished = ({ addOrder }) => {
  const history = useHistory();

  const goHome = () => {
    history.push("/home");
  };
  return (
    <>
      <p>Poll is finished</p>
      <p>Do you want to create an order for this poll?</p>
      <button className="submit-button" onClick={goHome}>
        No
      </button>
      <button className="submit-button make-order-btn" onClick={addOrder}>
        Yes
      </button>
    </>
  );
};

export default ShowFinished;
