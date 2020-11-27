import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./autocomplete.css";

const Autocomplete = ({
  selectedRestaurants,
  setSelectedRestaurants,
  allRestaurants,
  setPollName,
  placeholder,
}) => {
  const [filter, setFilter] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [text, setText] = useState("");
  const [chosen, setChosen] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handleClick = (e) => {
    setText(e.target.innerText);
    setFilter("");
    setChosen(e.target.value);
    console.log(e.target);

    if (setSelectedRestaurants !== undefined) {
      let tmp = [...selectedRestaurants];
      let newEntry = {
        restaurantId: e.target.value,
        restaurantName: e.target.innerText,
        votes: 0,
      };
      tmp.push(newEntry);
      setSelectedRestaurants(tmp);
      setDisabled(true);
    } else if (setPollName !== undefined) {
      setPollName(e.target.innerText);
    }
  };

  let notSelected = allRestaurants.filter(
    (restaurant) =>
      !selectedRestaurants
        .map((selected) => selected.restaurantId)
        .includes(restaurant.id)
  );
  var filtered = notSelected.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    filter !== "" ? setFilteredOptions(filtered) : setFilteredOptions([]);
  }, [filter]);

  return (
    <div className="autocomplete-wrapper">
      <input
        className="poll-input"
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
          setText(e.target.value);
        }}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
      />
      <br />
      <div id="ingredients">
        <ul className="search-results">
          {filteredOptions.map((el) => (
            <li key={el.id} className="search-result-item">
              <button
                className="search-result-button"
                type="button"
                value={el.id}
                onClick={handleClick}
              >
                {el.name}
                {el.label}
                <span hidden>{el.pollId}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
