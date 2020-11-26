import React, { useEffect, useState, useContext } from "react";
import { PollsContext } from "../../Context/PollsContext";
import "./style.css";

const ShowResults = ({ poll, user, setStep, getPoll }) => {
  const { polls, dispatch } = useContext(PollsContext);
  //const [poll, setPoll] = useState({});
  //   const getPoll = () => {
  //     PollsCollection.doc(pollId).then((response) => {
  //       setPoll(response.data());
  //     });
  //     checkSetStep();
  //   };

  //   useEffect(() => {
  //     getPoll();
  //   }, []);

  let sortedRestaurants = poll.restaurants.sort((a, b) => b.votes - a.votes);
  console.log(sortedRestaurants);
  const mostVotes = () => {
    let res = poll.restaurants.sort((a, b) => a.votes - b.votes).slice(-1)[0]
      .restaurantId;
    if (res === "" || res === undefined) {
      res = poll.restaurants[0];
    }
    console.log(res);
    return res;
  };

  const finishPoll = () => {
    dispatch({
      type: "FINISHED_POLL",
      payload: poll,
      restaurantId: mostVotes(),
    });
    setStep("finished");
  };

  const finishPollButton = () => {
    if (poll.createBy === user) {
      return (
        <button className="submit-button" onClick={finishPoll}>
          Finish poll
        </button>
      );
    }
  };
  return (
    <>
      <h1 className="poll-results">RESULTS</h1>
      {sortedRestaurants.map((restaurant) => (
        <li className="poll-item" key={restaurant.restaurantId}>
          <span>
            {restaurant.restaurantName} || {restaurant.votes}
          </span>
        </li>
      ))}
      {finishPollButton()}
    </>
  );
};

export default ShowResults;
