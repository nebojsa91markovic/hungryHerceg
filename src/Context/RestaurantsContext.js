import React, { createContext, useReducer } from "react";
import { RestaurantsReducer } from "../Reducers/RestaurantsReducer";

export const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, dispatchRestaurants] = useReducer(RestaurantsReducer, []);

  return (
    <RestaurantsContext.Provider value={{ restaurants, dispatchRestaurants }}>
      {props.children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
