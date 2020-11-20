import React from "react";
import { useEffect } from 'react';
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import './autocomplete.css';

const Autocomplete = ({ selectedRestaurants, setSelectedRestaurants, allRestaurants }) => {

  const [filter, setFilter] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [text, setText] = useState('');
  const [chosen, setChosen] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleClick = (e) => {
    // console.log(e.target.value);
    setText(e.target.innerText);
    setFilter('');
    let tmp = [...selectedRestaurants];
    let newEntry = { id: uuidv1(), restaurantId: e.target.value };
    tmp.push(newEntry);
    setChosen(e.target.value);
    // console.log(tmp);
    setSelectedRestaurants(tmp);
    setDisabled(true);
    // setDeleteBtn('show');
  }

  let notSelected = allRestaurants.filter(restaurant => !selectedRestaurants.map(selected => selected.restaurantId).includes(restaurant.id));
  let filtered = notSelected.filter(restaurant => restaurant.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    filter !== '' ?
      setFilteredOptions(filtered)
      :
      setFilteredOptions([])
  }, [filter]);

  return (

    <div className='autocomplete-wrapper'>
      <input className='autocomplete-input' type='text' onChange={(e) => { setFilter(e.target.value); setText(e.target.value) }} value={text} placeholder='Choose a restaurant' disabled={disabled} />
      <br />
      <div id='ingredients'>
        <ul className='search-results'>{filteredOptions.map(el =>
            <li key={el.id} className='search-result-item'>
          <button className='search-result-button' type='button' value={el.id} onClick={handleClick}>{el.name}</button>
            </li>
        )}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;