import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import PollsCollection from "../../collections/PollsCollection";
import OrdersCollection from "../../collections/OrdersCollection";
import firebase from "firebase/app";
import { useCookies } from "react-cookie";
import Timer from "../Timer/Timer";
import moment from "moment";

const ViewPoll = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  const pollId = useParams().pollId;
  const [poll, setPoll] = useState([]);
  const [vote, setVote] = useState("");
  const [voted, setVoted] = useState(false);
  const [duration, setDuration] = useState(0);

  const finishPoll = () => {
    PollsCollection.doc(pollId)
      .get()
      .then((response) => {
        if (response.data().createBy === cookies.user) {
          PollsCollection.doc(pollId).update({
            active: false,
          });
          alert("Poll is finished!");
        } else alert("You didn't created this poll, so you can't finish it!");
      });
  };

  const addVote = (event) => {
    event.preventDefault();
    PollsCollection.doc(pollId)
      .get()
      .then((response) => {
        return response.data();
      })
      .then((data) => {
        let newRestaurantVoteState = [...data.restaurants];
        let prevState = [...data.restaurants];

        newRestaurantVoteState = newRestaurantVoteState.filter(
          (restaurant) => restaurant.restaurantId === vote
        );

        let index = prevState.indexOf(newRestaurantVoteState[0]);

        newRestaurantVoteState[0].votes += 1;
        prevState[index] = newRestaurantVoteState[0];
        if (data.active) {
          PollsCollection.doc(pollId)
            .update({
              restaurants: prevState,
              voters: firebase.firestore.FieldValue.arrayUnion("dusan"),
            })
            .then(() => {
              setVoted(true);
            });
        } else {
          alert("Voting for this poll is expired.");
        }
      });
  };

  const getPoll = () => {
    PollsCollection.doc(pollId)
      .get()
      .then((response) => {
        setPoll(response.data());
      });
  };

  useEffect(() => {
    getPoll();
  }, [voted]);

  useEffect(() => {
    setDuration(-moment().diff(timeLeft(), "seconds"));
    // let c = moment(poll.created);
    // let e = moment(poll.created).add("30", "minutes");
    // setDuration(c.diff(e, "seconds"));
  }, [poll]);

  const timeLeft = () => {
    if (poll.created) {
      let created = poll.created;
      let pollDuration = { minutes: 30 };
      let endTime = moment(created).add(pollDuration).format();
      return endTime;
    }
  };

  const showVoting = () => {
    return (
      <form onSubmit={addVote}>
        {/* vote mode */}
        <div className="restaurantList">
          <ul className="poll-vote-list">
            {poll.restaurants &&
              poll.restaurants.map((restaurant) => (
                <li key={restaurant.restaurantId}>
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
        <input type="submit" />
      </form>
    );
  };

  const finishPollButton = () => {
    if (poll.createBy === cookies.user) {
      return <button onClick={finishPoll}>Finish poll</button>;
    }
  };

  const showResults = () => {
    return (
      <>
        <h1>RESULTS</h1>
        {poll.restaurants.map((restaurant) => (
          <li key={restaurant.restaurantId}>
            <span>
              {restaurant.restaurantName}|| {restaurant.votes}
            </span>
          </li>
        ))}
        {finishPollButton()}
      </>
    );
  };
  console.log(-moment().diff(timeLeft(), "seconds"));

  return (
    <div className="polls">
      <h3>Naziv ankete: {poll.label}</h3>
      {duration && <Timer duration={duration} pollId={pollId} />}
      {!voted ? showVoting() : showResults()}
    </div>
  );
};

export default ViewPoll;
