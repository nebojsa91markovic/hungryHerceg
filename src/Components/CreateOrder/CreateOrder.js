import React, { useState } from "react";
import OrdersCollection from "../../collections/OrdersCollection";
import PollsCollection from "../../collections/PollsCollection";
import moment from "moment";
import { useCookies } from "react-cookie";

const CreateOrder = () => {
  const [cookies] = useCookies(["user"]);

  const [pollName, setPollName] = useState("");
  const [restaurantWon, setRestaurantWon] = useState("");

  const addOrder = () => {
    if (pollName.trim("").length === 0 || restaurantWon.trim("").length === 0) {
      alert("Please insert valid informations");
      return;
    }
    let newDocRef = OrdersCollection.doc();

    newDocRef
      .set({
        created: moment().format(),
        createBy: cookies.user,
        label: pollName,
        restaurantId: restaurantWon,
        active: true,
        allMeals: [],
        id: newDocRef.id,
      })
      .then(() => {
        PollsCollection.doc("bb394d29-d3a8-45a9-b009-e7b90db94fc3").update({
          isOrderCreated: true,
        });

        console.log("Order created");
      });
  };

  return (
    <div className="polls">
      {/* Ljubica */}
      {/* izaberi anketu */}
      <input
        className="poll-input"
        type="text"
        onChange={(event) => setRestaurantWon(event.target.value)}
      />
      <input
        className="poll-input"
        type="text"
        onChange={(event) => setPollName(event.target.value)}
      />
      <button className="submit-button" onClick={addOrder}>
        Push
      </button>
    </div>
  );
};

export default CreateOrder;
