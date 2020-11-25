import OrdersCollection from "../collections/OrdersCollection";

export const OrdersReducer = (state, action) => {
  console.log("STIGLI SMO U ORDERS");
  console.log(state, action.payload, 111);
  switch (action.type) {
    case "ALL_ORDERS":
      return action.payload.allOrders;
    case "ADD_ORDER":
      console.log(state, action, 222);

      OrdersCollection.doc(action.payload.id)
        .set(action.payload)
        .then(() => console.log("usepsno dodat order"));
      return [...state, action.payload];
    // case "FINISHED_ORDER":
    //   return prevState;

    case "REMOVE_ORDER":
      OrdersCollection.doc(action.payload.id)
        .delete()
        .then(() => console.log("successfully removed order"));
      return state.filter((order) => order.id === action.payload.id);
    default:
      return state.filter();
  }
};
