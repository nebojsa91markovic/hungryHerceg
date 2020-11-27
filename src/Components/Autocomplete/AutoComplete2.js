import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./autocomplete.css";

const AutoComplete2 = ({
  allPolls,
  setOrderName,
  setRestaurantWon,
  setPollId,
  placeholder,
}) => {
  const [filter, setFilter] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [text, setText] = useState("");
  const [chosen, setChosen] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handleClick = (e) => {
    setText(e.target.innerText);
    setOrderName(e.target.innerText);
    setFilter("");

    console.log(e.target);
    setChosen(e.target.value);
    //if (setRestaurantWon !== undefined) setRestaurantWon(e.target.value);
    console.log(allPolls());
    let chosenPoll = allPolls().filter((poll) => poll.id == e.target.value)[0];
    console.log(chosenPoll);

    setRestaurantWon(chosenPoll);
    setPollId(chosenPoll.id);
    console.log(chosenPoll);
  };

  var filtered = allPolls().filter((poll) =>
    poll.label.toLowerCase().includes(filter.toLocaleLowerCase())
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

export default AutoComplete2;
