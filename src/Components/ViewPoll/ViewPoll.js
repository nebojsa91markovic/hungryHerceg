import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ApiBase from "../../services/ApiBase/ApiBase";
import ApiKey from "../../services/ApiKey/ApiKey";
import "./style.css";
import PollsCollection from "../../collections/PollsCollection";
import OrdersCollection from "../../collections/OrdersCollection";
import firebase from "firebase/app";
import { useCookies } from "react-cookie";
import Timer from "../Timer/Timer";
import moment from "moment";
import { PollsContext } from "../../Context/PollsContext";

const ViewPoll = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const { polls, dispatch } = useContext(PollsContext);

  const pollId = useParams().pollId;
  const [poll, setPoll] = useState([]);
  const [allPolls, setAllPolls] = useState([]);
  const [vote, setVote] = useState("");
  const [voted, setVoted] = useState(false);
  const [duration, setDuration] = useState(0);

  const config = {
    headers: {
      Authorization: "Bearer " + ApiKey,
    },
  };

  // dispatch({ type: "ALL_POLLS", payload: { allPolls: arrAllPolls } });

  const addOrder = () => {
    OrdersCollection.doc()
      .set(
        {
          created: "now",
          createBy: "tesla@tesla.com",
          label: "pollName",
          restaurantId: "20ce30a6-fe28-s4c75-a37a-5499851af079",
          active: true,
          allMeals: [],
        },
        { merge: true }
      )
      .then(() => {
        console.log("order upisan");
      });
  };

  const finishPoll = () => {
    dispatch({
      type: "FINISHED_POLL",
      payload: poll,
    });

    // PollsCollection.doc(pollId)
    //   .get()
    //   .then((response) => {
    //     if (response.data().createBy === cookies.user) {
    //       PollsCollection.doc(pollId).update({
    //         active: false,
    //       });
    //       alert("zavrseno");
    //     } else alert("nisi admin");
    //   });
  };

  const addVote = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADDVOTE_POLL",
      payload: poll,
      userId: cookies.user,
      vote: vote,
    });

    setVoted(true);

    // PollsCollection.doc(pollId)
    //   .get()
    //   .then((response) => {
    //     return response.data();
    //   })
    //   .then((data) => {
    //     let newRestaurantVoteState = [...data.restaurants];
    //     let prevState = [...data.restaurants];

    //     newRestaurantVoteState = newRestaurantVoteState.filter(
    //       (restaurant) => restaurant.restaurantId === vote
    //     );

    //     let index = prevState.indexOf(newRestaurantVoteState[0]);

    //     newRestaurantVoteState[0].votes += 1;
    //     prevState[index] = newRestaurantVoteState[0];
    //     if (data.active) {
    //       PollsCollection.doc(pollId)
    //         .update({
    //           restaurants: prevState,
    //           voters: firebase.firestore.FieldValue.arrayUnion("dusan"),
    //         })
    //         .then(() => {
    //           setVoted(true);
    //         });
    //     } else {
    //       alert("Ova anketa je istekla, glasanje nije moguce");
    //     }
    //   });
  };

  const getPoll = () => {
    console.log(pollId);
    // return polls.filter((poll) => poll.id === pollId)[0];

    setPoll(polls.filter((poll) => poll.id === pollId)[0]);
    // PollsCollection.doc(pollId)
    //   .get()
    //   .then((response) => {
    //     setPoll(response.data());
    //   });
  };

  useEffect(() => {
    getPoll();
    // axios.get(`${ApiBase}polls/${pollId}`)
    //     .then(response => {
    //         console.log(response.data)
    //         setPoll(response.data);
    //     });
  }, [voted]);

  // useEffect(() => {
  //     axios.get(`${ApiBase}polls`, config)
  //         .then(response => {
  //             console.log(response.data);
  //             setAllPolls(response.data);
  //         })
  // }, []);

  // console.log('OVO JE ANKETA', poll);

  useEffect(() => {
    setDuration(-moment().diff(timeLeft(), "seconds"));
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

  const finishPollButton = () => {
    if (poll.createBy === cookies.user) {
      return (
        <button className="submit-button" onClick={finishPoll}>
          Finish poll
        </button>
      );
    }
  };

  const showResults = () => {
    return (
      <>
        <h1 className="poll-results">RESULTS</h1>
        {poll.restaurants.map((restaurant) => (
          <li className="poll-item" key={restaurant.restaurantId}>
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
      <h3 className="poll-name">Poll name: {poll.label}</h3>
      {duration && <Timer duration={duration} pollId={pollId} />}
      {voted === false ? showVoting() : showResults()}
    </div>
  );
};

export default ViewPoll;
