import React, { useState, useContext } from "react";
import moment from "moment";
import { useCookies } from "react-cookie";
import AutoComplete2 from "../Autocomplete/AutoComplete2";
import BackButton from "../BackButton/BackButton";
import { OrdersContext } from "../../Context/OrdersContext";
import { v4 as uuidv4 } from "uuid";
import { PollsContext } from "../../Context/PollsContext";
import style from "./style.css";
import { useHistory } from "react-router-dom";
const CreateOrder = () => {
  const [cookies] = useCookies(["user"]);
  const { orders, dispatchOrders } = useContext(OrdersContext);
  const { polls, dispatch } = useContext(PollsContext);

  const history = useHistory();

  const [orderName, setOrderName] = useState("");
  const [restaurantWon, setRestaurantWon] = useState("");
  const [pollId, setPollId] = useState("");

  const dotayFinishedPollsArray = [
    { id: 1, name: "Rucak za subotu", restaurantWon: 4 },
    { id: 2, name: "Sta cemo da jedemo", restaurantWon: 2 },
    { id: 3, name: "Treca anketa", restaurantWon: 3 },
  ];

  // const restaurantsWonArray = [
  //   {idRestaurant: 1,
  //   name: 'Picerija Bucko',
  //   meals: ['Parce pice', 'Cela pica', 'Pica sa slaninom']},
  //   {idRestaurant : 2,
  //   name: 'Leskovacki rostilj',
  //   melas: ['Gurmanska pljeskavica', 'Burger', 'Pomfrit']},
  //   {idRestaurant : 2,
  //   name: 'Kineska hrana',
  //   melas: ['Piletina sa kikirikije', 'Slatko-ljuta supa', 'Nudle sa svinjetinom']}
  // ]

  const createOrder = () => {
    // if (orderName.trim("").length === 0 || restaurantWon === 0) {
    //   alert("Please insert valid informations");
    //   return;
    // }
    // let newDocRef = OrdersCollection.doc();

    let orderId = uuidv4();
    dispatchOrders({
      type: "CREATE_ORDER",
      payload: {
        created: moment().format(),
        createBy: cookies.user,
        label: orderName,
        restaurantId: restaurantWon.restaurantId,
        active: true,
        allMeals: [],
        id: orderId,
        restaurantName: restaurantWon.restaurantName,
      },
      pollId: pollId,
    });
    history.push(`order/${orderId}`);
  };

  const filteredPolls = () => {
    let newArray = polls.filter((poll) => !poll.active);

    newArray = newArray.filter((poll) => !poll.isOrderCreated);
    return newArray;
  };
  filteredPolls();
  return (
    <div className="polls-wrapper">
      <BackButton />
      <div className="polls">
        <h3>Select a poll from which you want to proceed with order:</h3>
        {/* izaberi anketu */}
        <AutoComplete2
          allPolls={filteredPolls}
          setOrderName={setOrderName}
          setRestaurantWon={setRestaurantWon}
          setPollId={setPollId}
          placeholder="Choose poll"
        />
        <button className="submit-button" onClick={createOrder}>
          Create an order
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
