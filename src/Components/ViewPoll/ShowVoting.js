import React, { useState, useContext } from "react";
import { PollsContext } from "../../Context/PollsContext";
import "./style.css";

const ShowVoting = ({ poll, setStep, user }) => {
  const { dispatch } = useContext(PollsContext);

  const [vote, setVote] = useState("");

  const addVote = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADDVOTE_POLL",
      payload: poll,
      userId: user,
      vote: vote,
    });
    setStep("results");
  };
  return (
    <form onSubmit={addVote}>
      {/* vote mode */}
      <div className="restaurantList">
        <ul className="poll-vote-list">
          {poll.restaurants &&
            poll.restaurants.map((restaurant) => (
              <li className="poll-item" key={restaurant.restaurantId}>
                <label htmlFor={restaurant.restaurantId}>
                  {restaurant.restaurantName}
                </label>
                <input
                  type="radio"
                  id={restaurant.restaurantId}
                  name="restaurant"
                  value={restaurant.restaurantId}
                  onChange={(e) => setVote(e.target.value)}
                />
              </li>
            ))}
        </ul>
      </div>
      <input className="submit-button" type="submit" />
    </form>
  );
};

export default ShowVoting;
