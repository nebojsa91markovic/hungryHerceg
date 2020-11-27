import React, { useContext, useEffect, useState } from "react";
import PollsCollection from "../../collections/PollsCollection";
import PollItem from "../PollItem/PollItem";
import { PollsContext } from "../../Context/PollsContext";

const AllPolls = () => {
  const { polls, dispatch } = useContext(PollsContext);

  const [filter, setFilter] = useState("name");

  const finishOrder = () => {
    PollsCollection.doc("1c207585-ee01-4b1d-94d1-f4fb694e4191").update({
      active: false,
    });
  };

  const sortPolls = () => {
    if (filter === "name") {
      return polls.sort(function (a, b) {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      });
    } else if (filter === "ends") {
      return polls.sort(function (a, b) {
        let dateA = new Date(a.created),
          dateB = new Date(b.created);
        return dateA - dateB;
      });
    } else {
      return polls;
    }
  };
  console.log(sortPolls());

  useEffect(() => {
    sortPolls();
  }, [filter]);

  return (
    <div className="allPolls">
      <div className="pollItem-header">
        <button onClick={(event) => setFilter(event.target.value)} value="name">
          Name{" "}
        </button>
        <button onClick={(event) => setFilter(event.target.value)} value="date">
          Date{" "}
        </button>
        <button onClick={(event) => setFilter(event.target.value)} value="ends">
          Ends in
        </button>
        <button
          onClick={(event) => setFilter(event.target.value)}
          value="ordered"
        >
          Ordered
        </button>
      </div>
      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default AllPolls;
