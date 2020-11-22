import React, { createContext, useReducer } from "react";
import {LoginReducer} from "../Reducers/LoginReducer"

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [isLogedIn, dispatch] = useReducer(LoginReducer);

  return (
    <LoginContext.Provider value={{ isLogedIn, dispatch }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
