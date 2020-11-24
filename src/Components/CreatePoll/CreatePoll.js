import React, { useEffect } from "react";
import { useState } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import { useHistory } from "react-router-dom";
import RestaurantCollection from "../../collections/RestaurantCollection";
import PollsCollection from "../../collections/PollsCollection";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useCookies } from "react-cookie";

import "./style.css";

const CreatePoll = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([
    { restaurantId: 0 },
  ]);
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const history = useHistory();

  useEffect(() => {
    let allRestaurants = [];
    RestaurantCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        allRestaurants.push(doc.data());
      });
      setAllRestaurants(allRestaurants);
    });
  }, []);

  const createNewPoll = (e) => {
    e.preventDefault();

    let restaurants = selectedRestaurants
      .slice(1)
      .map((selectedRestaurant) => selectedRestaurant.restaurantId);
    console.log(restaurants, "ovde smo");
    let pollId = uuidv4();

    PollsCollection.doc(pollId)
      .set({
        created: moment(`${date}T${time}`).format(),
        createBy: cookies.user,
        label: label,
        restaurants: selectedRestaurants.slice(1),
        active: true,
        id: pollId,
        voters: [],
        isOrderCreated: false,
      })
      .then(() => {
        history.push(`poll/${pollId}`);
      });
  };

  return (
    <div className="polls">
      <form onSubmit={createNewPoll}>
        <label className="poll-label">Poll name:</label>
        <input
          className="poll-input"
          type="text"
          placeholder="Poll Name..."
          onChange={(e) => setLabel(e.target.value)}
        />
        <br />
        <div className="setTime">
          <label className="poll-starts">Poll starts at: </label>
          <br />
          <input
          className="date-time-input"
            type="date"
            name="pollStartsAt"
            onChange={(event) => setDate(event.target.value)}
          />
          <input
             className="date-time-input"
            type="time"
            name="pollStartsAt"
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
        <br />
        {selectedRestaurants.map((selected) => {
          return (
            <Autocomplete
              key={selected.restaurantId}
              selectedRestaurants={selectedRestaurants}
              setSelectedRestaurants={setSelectedRestaurants}
              allRestaurants={allRestaurants}
              placeholder='Choose a restaurant'
            />
          );
        })}
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
};

export default CreatePoll;
