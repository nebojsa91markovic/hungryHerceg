import React, { createContext, useReducer } from "react";
import { PollsReducer } from "../Reducers/PollsReducer";

export const PollsContext = createContext();

const PollsContextProvider = (props) => {
  const [polls, dispatch] = useReducer(PollsReducer, []);

  return (
    <PollsContext.Provider value={{ polls, dispatch }}>
      {props.children}
    </PollsContext.Provider>
  );
};

export default PollsContextProvider;
