import React, { useContext, useEffect, useState } from "react";
import PollItem from "../PollItem/PollItem";
import { PollsContext } from "../../Context/PollsContext";

const AllPolls = () => {
  const { polls } = useContext(PollsContext);

  const [filter] = useState("name");

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

  useEffect(() => {
    sortPolls();
  }, [filter]);

  return (
    <div className="allPolls">
      <div className="pollItem-header">
        <span value="name">Name </span>
        <span value="date">Date </span>
        <span value="ends">Ends in</span>
        <span value="ordered">Ordered</span>
      </div>
      {polls.map((poll) => (
        <PollItem key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default AllPolls;
