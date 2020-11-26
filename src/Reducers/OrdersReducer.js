import OrdersCollection from "../collections/OrdersCollection";
import PollsCollection from "../collections/PollsCollection";
import firebase from "firebase";

export const OrdersReducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "ALL_ORDERS":
      return action.payload.allOrders;
    case "CREATE_ORDER":
      console.log(action, action.payload.createBy);
      const {
        active,
        allMeals,
        createBy,
        created,
        id,
        label,
        restaurantId,
      } = action.payload;
      OrdersCollection.doc(action.payload.id)
        .set({
          active,
          allMeals,
          createBy,
          created,
          id,
          label,
          restaurantId,
        })
        .then(() => alert("Order successfully added!"));
      PollsCollection.doc(action.pollId)
        .update({
          isOrderCreated: true,
        })
        .then(() => alert("order is created by poll"))
        .then(() => alert("Order is now created!"));
      return [...state, action.payload];
    // case "FINISHED_ORDER":
    //   return prevState;
    case "ADD_ORDER":
      OrdersCollection.doc(action.orderId).update({
        allMeals: firebase.firestore.FieldValue.arrayUnion(action.payload),
      });

      return state;
    case "REMOVE_ORDER":
      OrdersCollection.doc(action.payload.id)
        .delete()
        .then(() => console.log("successfully removed order"));
      return state.filter((order) => order.id === action.payload.id);
    default:
      return state.filter();
  }
};
