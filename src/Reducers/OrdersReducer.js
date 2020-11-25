import OrdersCollection from "../collections/OrdersCollection";
import firebase from "firebase";

export const OrdersReducer = (state, action) => {
  console.log("STIGLI SMO U ORDERS");
  console.log(state, action.payload, 111);
  switch (action.type) {
    case "ALL_ORDERS":
      return action.payload.allOrders;
    case "CREATE_ORDER":
      console.log(state, action, 222);
      console.log(action.payload, action.payload.id);
      OrdersCollection.doc(action.payload.id)
        .set(action.payload)
        .then(() => console.log("usepsno dodat order"));
      return [...state, action.payload];
    // case "FINISHED_ORDER":
    //   return prevState;
    case "ADD_ORDER":
      console.log("ADD ORDER", action, state, action.payload);
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
