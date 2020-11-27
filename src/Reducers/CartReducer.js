import CartCollection from "../collections/CartCollection";

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ALL_CARTS":
      return action.payload.allCart;
    case "ADD_CART":
      CartCollection.doc(action.payload.id).set(action.payload);
      return [...state, action.payload];
    // case "FINISHED_CART":
    //   return prevState;

    case "REMOVE_CART":
      CartCollection.doc(action.payload.id).delete();
      return state.filter((cart) => cart.id === action.payload.id);
    default:
      return state.filter();
  }
};
