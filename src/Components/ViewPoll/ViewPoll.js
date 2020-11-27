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
import ShowVoting from "./ShowVoting";
import ShowResults from "./ShowResults";
import ShowFinished from "./ShowFinished";
import PollsCollection from "../../collections/PollsCollection";

const ViewPoll = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const { polls, dispatch } = useContext(PollsContext);
  const { orders, dispatchOrders } = useContext(OrdersContext);

  const history = useHistory();

  const pollId = useParams().pollId;

  const [poll, setPoll] = useState([]);

  const [step, setStep] = useState("");

  const [duration, setDuration] = useState(0);

  const checkSetStep = () => {
    console.log(poll);
    setTimeout(() => {
      if (poll.active === false) {
        setStep("finished");
      } else if (poll.voters !== undefined) {
        if (poll.voters.includes(cookies.user)) {
          setStep("results");
        }
      } else {
        setStep("voting");
      }
    }, 500);
  };

  const getNewResults = () => {
    PollsCollection.doc(pollId)
      .get()
      .then((response) => {
        setPoll(response.data());
      });
    return (
      <ShowResults
        poll={poll}
        setStep={setStep}
        user={cookies.user}
        getPoll={getPoll}
      />
    );
  };

  const getPoll = () => {
    PollsCollection.doc(pollId)
      .get()
      .then((response) => {
        setPoll(response.data());
      })
      .then(() => {
        checkSetStep();
      });

    //setPoll(polls.filter((poll) => poll.id === pollId)[0]);
  };

  useEffect(() => {
    getPoll();
  }, [step]);

  const mostVotes = () => {
    let res = poll.restaurants.sort((a, b) => a.votes - b.votes).slice(-1)[0];
    if (res.restaurantId === "" || res.restaurantId === undefined) {
      res = poll.restaurants[0];
    }
    return res;
  };

  const addOrder = () => {
    let orderId = uuidv4();
    let creator = cookies.user;
    console.log("creator", cookies.user);

    if (poll.createBy === creator) {
      dispatchOrders({
        type: "CREATE_ORDER",
        payload: {
          created: moment().format(),
          createBy: `${creator}`,
          label: poll.label,
          restaurantId: mostVotes().restaurantId,
          restaurantName: mostVotes().restaurantName,
          active: true,
          allMeals: [],
          id: orderId,
        },
        pollId: pollId,
      });

      alert("Order Successfully added!");
      history.push(`/order/${orderId}`);
    } else {
      alert("You can't make order. You didn't creted poll!");
    }
  };

  return (
    <div className="polls-wrapper">
      <BackButton />
      <div className="polls">
        <h3 className="poll-name">Poll name: {poll.label}</h3>

        {/* {duration > 0 ? (
          ""
        ) : (
          // <Timer duration={duration} pollId={pollId} />
          <span className="timer">Isteklo</span>
        )} */}

        {step === "voting" ? (
          <ShowVoting poll={poll} setStep={setStep} user={cookies.user} />
        ) : step === "results" ? (
          getNewResults()
        ) : step === "finished" ? (
          <ShowFinished addOrder={addOrder} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ViewPoll;
