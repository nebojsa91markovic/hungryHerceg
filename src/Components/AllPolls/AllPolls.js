import React, { useEffect, useState } from "react";
import PollsCollection from "../../collections/PollsCollection";
import PollItem from "../PollItem/PollItem";

const AllPolls = () => {
  const [polls, setPolls] = useState([]);

  const finishOrder = () => {
    PollsCollection.doc("1c207585-ee01-4b1d-94d1-f4fb694e4191").update({
      active: false,
    });
  };

  const getAllPolls = () => {
    let arrAllPolls = [];
    PollsCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        arrAllPolls.push(doc.data());
      });
      setPolls(arrAllPolls);
    });
  };

  useEffect(() => {
    getAllPolls();
  }, []);

  return (
    <div className="allPolls">
      <div className="pollItem">
        <h3>Name: </h3>
        <span>Date: </span>
        <span>Ends in:</span>
        <span>Ordered:</span>
      </div>
      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default AllPolls;
