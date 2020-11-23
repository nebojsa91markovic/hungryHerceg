import React, { useEffect } from "react";
import { useState } from 'react';
import Autocomplete from "../Autocomplete/Autocomplete";
import ApiKey from "../../services/ApiKey/ApiKey"
import ApiBase from "../../services/ApiBase/ApiBase";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import './createPoll.css';
import RestaurantCollection from "../../collections/RestaurantCollection"
import PollsCollection from "../../collections/PollsCollection"
import { v4 as uuidv4 } from 'uuid';
import Moment from 'react-moment';
import moment from 'moment';
import { useCookies } from "react-cookie";

const CreatePoll = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([{ restaurantId: 0 }]);
  const [label, setLabel] = useState('');
  const history = useHistory();
  const user = localStorage.getItem('userName');

  const config = {
    headers: {
      "Authorization": "Bearer " + ApiKey
    }
  };

  useEffect(() => {

    let allRestaurants = [];
    RestaurantCollection.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        allRestaurants.push(doc.data());
      });
      console.log(allRestaurants);
      setAllRestaurants(allRestaurants);
    });


  }, []);


  let d = new Date();
  let datetime = d.getFullYear() + '-'
    + (d.getMonth() + 1) + '-'
    + d.getDate() + ' '
    + d.getHours() + ':'
    + d.getMinutes() + ':'
    + d.getSeconds();

    let date1 = moment().format('MMMM Do YYYY, h:mm:ss a')
    console.log(date1, 'ovo je date')


  const createNewPoll = (e) => {

    e.preventDefault();
    console.log(selectedRestaurants, 'prvi')
    console.log(selectedRestaurants[1], 'drugi')

    let restaurants = selectedRestaurants.slice(1).map(selectedRestaurant => selectedRestaurant.restaurantId);
console.log(restaurants, 'ovde smo')
    let pollId = uuidv4();





    PollsCollection.doc(pollId).set({
      created: moment().format('MMMM Do YYYY, h:mm:ss a'),
      createBy: cookies.user,
      label: label,
      restaurants: selectedRestaurants.slice(1),
      active: true,
      id: pollId,
      voters: [],
      isOrderCreated: false
    }, {merge: true})
    .then(() => {
      history.push(`poll/${pollId}`);
  })

  }


  return (
    <div className="polls">
      <form onSubmit={createNewPoll}>
        <label className="poll-label">Poll Name</label>
        <input className="poll-input" type="text" placeholder="Monday..." onChange={(e) => setLabel(e.target.value)} />
        <br />
        {/* <span >Datum i vreme: {datetime}</span>
        <br /> */}
        {selectedRestaurants.map(selected => {
          return (
            <Autocomplete key={selected.restaurantId} selectedRestaurants={selectedRestaurants} setSelectedRestaurants={setSelectedRestaurants} allRestaurants={allRestaurants}  />
          )
        })}
        <input type="submit" className="submit-button" />

      </form>
    </div>
  );
};

export default CreatePoll;

