import CartCollection from "../collections/CartCollection";

export const CartReducer = (state, action) => {
  console.log("STIGLI SMO U CARTS");
  console.log(state, action.payload, 111);
  switch (action.type) {
    case "ALL_CARTS":
      return action.payload.allCart;
    case "ADD_CART":
      console.log(state, action, 222);

      CartCollection.doc(action.payload.id)
        .set(action.payload)
        .then(() => console.log("usepsno dodat cart"));
      return [...state, action.payload];
    // case "FINISHED_CART":
    //   return prevState;

    case "REMOVE_CART":
      CartCollection.doc(action.payload.id)
        .delete()
        .then(() => console.log("successfully removed cart"));
      return state.filter((cart) => cart.id === action.payload.id);
    default:
      return state.filter();
  }
};
