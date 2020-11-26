import React, { useContext } from "react";
import PollsCollection from "../../collections/PollsCollection";
import PollItem from "../PollItem/PollItem";
import { PollsContext } from "../../Context/PollsContext";

const AllPolls = () => {
  const { polls, dispatch } = useContext(PollsContext);

  const finishOrder = () => {
    PollsCollection.doc("1c207585-ee01-4b1d-94d1-f4fb694e4191").update({
      active: false,
    });
  };

  return (
    <div className="allPolls">
      <div className="pollItem-header">
        <span>Name </span>
        <span>Date </span>
        <span>Ends in</span>
        <span>Ordered</span>
      </div>
      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default AllPolls;
