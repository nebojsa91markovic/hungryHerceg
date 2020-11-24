import React, { useState, useContext } from "react";
import OrdersCollection from "../../collections/OrdersCollection";
import PollsCollection from "../../collections/PollsCollection";
import moment from "moment";
import { useCookies } from "react-cookie";
import Autocomplete from "../Autocomplete/Autocomplete";
import { OrdersContext } from "../../Context/OrdersContext";
import { v4 as uuidv4 } from "uuid";

const CreateOrder = () => {
  const [cookies] = useCookies(["user"]);
  const { orders, dispatchOrders } = useContext(OrdersContext);

  const [orderName, setOrderName] = useState("");
  const [restaurantWon, setRestaurantWon] = useState(0);

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

  const addOrder = () => {
    // if (orderName.trim("").length === 0 || restaurantWon === 0) {
    //   alert("Please insert valid informations");
    //   return;
    // }
    // let newDocRef = OrdersCollection.doc();

    let orderId = uuidv4();

    dispatchOrders({
      type: "ADD_ORDER",
      payload: {
        created: moment().format(),
        createBy: cookies.user,
        label: orderName,
        restaurantId: restaurantWon,
        active: true,
        allMeals: [],
        id: orderId,
      },
    });

    // newDocRef
    //   .set({
    //     created: moment().format(),
    //     createBy: cookies.user,
    //     label: orderName,
    //     restaurantId: restaurantWon,
    //     active: true,
    //     allMeals: [],
    //     id: newDocRef.id,
    //   })
    //   .then(() => {
    //     PollsCollection.doc("bb394d29-d3a8-45a9-b009-e7b90db94fc3").update({
    //       isOrderCreated: true,
    //     });

    //     console.log("Order created");
    //   });
  };

  return (
    <div className="orders">
      <h3>Start an order</h3>
      {/* Ljubica */}
      {/* izaberi anketu */}
      <Autocomplete
        allOrders={orders}
        setOrderName={setOrderName}
        setRestaurantWon={setRestaurantWon}
        placeholder="Choose a order"
      />
      {/* <input
        className="order-input"
        type="text"
        onChange={(event) => setRestaurantWon(event.target.value)}
      />
      <input
        className="order-input"
        type="text"
        onChange={(event) => setOrderName(event.target.value)}
      /> */}
      <button className="submit-button" onClick={addOrder}>
        Create an order
      </button>
    </div>
  );
};

export default CreateOrder;
