import React, { useEffect } from "react";
import { useState } from 'react';
import Autocomplete from "../Autocomplete/Autocomplete";
import ApiKey from "../../services/ApiKey/ApiKey"
import ApiBase from "../../services/ApiBase/ApiBase";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import './createPoll.css';

const CreatePoll = () => {

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([{ id: 0 }]);
  const [label, setLabel] = useState('');
  const history = useHistory();
  const user = localStorage.getItem('userName');

  const config = {
    headers: {
      "Authorization": "Bearer " + ApiKey
    }
  };

  useEffect(() => {
    axios.get(`${ApiBase}restaurants`, config)
      .then(response => {
        console.log(response.data);
        setAllRestaurants(response.data);
      })
      .catch(err => console.log(err));

  }, []);


  let d = new Date();
  let datetime = d.getFullYear() + '-'
    + (d.getMonth() + 1) + '-'
    + d.getDate() + ' '
    + d.getHours() + ':'
    + d.getMinutes() + ':'
    + d.getSeconds();


  const createNewPoll = (e) => {

    e.preventDefault();

    let restaurants = selectedRestaurants.slice(1).map(selectedRestaurant => selectedRestaurant.restaurantId);

    let body = {
      label,
      restaurants
    }

    axios.post(`${ApiBase}polls`, body, config)
      .then(response => {
        console.log(response.data);
        let pollId = response.data.id;
        history.push(`poll/${pollId}`);
      })
      .catch(err => console.log(err));



  }


  return (
    <div className="polls">
      <form onSubmit={createNewPoll}>
        <label>Naziv ankete</label>
        <input type="text" placeholder="radna subota" onChange={(e) => setLabel(e.target.value)} />
        <br />
        <span>Datum i vreme: {datetime}</span>
        <br />
        {selectedRestaurants.map(selected => {
          return (
            <Autocomplete key={selected.id} selectedRestaurants={selectedRestaurants} setSelectedRestaurants={setSelectedRestaurants} allRestaurants={allRestaurants} />
          )
        })}
        <input type="submit" />

      </form>
    </div>
  );
};

export default CreatePoll;

