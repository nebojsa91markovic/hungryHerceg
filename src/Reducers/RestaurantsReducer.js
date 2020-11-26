import RestaurantCollection from "../collections/RestaurantCollection";
import firebase from "firebase";

export const RestaurantsReducer = (state, action) => {
  switch (action.type) {
    case "ALL_RESTAURANTS":
      return action.payload;
    // case "CREATE_RESTAURANT":
    //   console.log(state, action, 222);

    //   RestaurantCollection.doc(action.payload.id)
    //     .set(action.payload)
    //     .then(() => console.log("usepsno dodat order"));
    //   return [...state, action.payload];
    // // case "FINISHED_RESTAURANT":
    // //   return prevState;
    // case "ADD_RESTAURANT":
    //   console.log("ADD RESTAURANT", action, state, action.payload);
    //   RestaurantCollection.doc(action.orderId).update({
    //     allMeals: firebase.firestore.FieldValue.arrayUnion(action.payload),
    //   });

    //   return state;
    // case "REMOVE_RESTAURANT":
    //   RestaurantCollection.doc(action.payload.id)
    //     .delete()
    //     .then(() => console.log("successfully removed order"));
    //   return state.filter((order) => order.id === action.payload.id);
    // default:
    //   return state;
  }
};
