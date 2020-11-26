import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import { useCookies } from "react-cookie";
import Timer from "../Timer/Timer";
import moment from "moment";
import { PollsContext } from "../../Context/PollsContext";
import { OrdersContext } from "../../Context/OrdersContext";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import BackButton from "../BackButton/BackButton";

const ViewPoll = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const { polls, dispatch } = useContext(PollsContext);
  const { orders, dispatchOrders } = useContext(OrdersContext);

  const history = useHistory();

  const pollId = useParams().pollId;
  const [poll, setPoll] = useState([]);
  const [vote, setVote] = useState("");
  const [step, setStep] = useState("voting");
  const [duration, setDuration] = useState(0);

  const goHome = () => {
    history.push("/home");
  };

  //restoran pobedio
  const mostVotes = () => {
    let res = poll.restaurants.sort((a, b) => a.votes - b.votes).slice(-1)[0]
      .restaurantId;
    if (res === "" || res === undefined) {
      res = poll.restaurants[0];
    }
    return res;
  };

  //preko reducer kreiranje ordera preko poll-a
  const addOrder = () => {
    let orderId = uuidv4();

    dispatchOrders({
      type: "CREATE_ORDER",
      payload: {
        created: moment().format(),
        createBy: cookies.user,
        label: poll.label,
        restaurantId: mostVotes(),
        active: true,
        allMeals: [],
        id: orderId,
      },
      pollId: pollId,
    });

    alert("Order Successfully added!");
    history.push(`/order/${orderId}`);
  };

  //reducer finish poll
  const finishPoll = () => {
    dispatch({
      type: "FINISHED_POLL",
      payload: poll,
    });
    setStep("finished");
  };

  const addVote = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADDVOTE_POLL",
      payload: poll,
      userId: cookies.user,
      vote: vote,
    });
    setStep("results");
  };

  const getPoll = () => {
    setPoll(polls.filter((poll) => poll.id === pollId)[0]);
    setTimeout(() => {}, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      getPoll();
    }, 500);
  }, [step]);

  useEffect(() => {
    setDuration(-moment().diff(timeLeft(), "seconds"));
  }, [poll]);

  useEffect(() => {}, []);

  const timeLeft = () => {
    if (poll.created !== undefined) {
      let created = poll.created;
      let pollDuration = { minutes: 30 };
      let endTime = moment(created).add(pollDuration).format();
      return endTime;
    } else return 0;
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

  const showResults = () => {
    let sortedRestaurants = poll.restaurants.sort((a, b) => b.votes - a.votes);

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

  const startNewOrder = () => {
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

  return (
    <div className="polls-wrapper">
      <BackButton />
      <div className="polls">
        <h3 className="poll-name">Poll name: {poll.label}</h3>
        {duration > 0 ? (
          <Timer duration={duration} pollId={pollId} />
        ) : (
          <span className="timer">Isteklo</span>
        )}
        {/* {voted === false ? showVoting() : showResults()} */}
        {step === "results"
          ? showResults()
          : step === "finished"
          ? startNewOrder()
          : showVoting()}
      </div>
    </div>
  );
};

export default ViewPoll;
