import React, { createContext, useReducer, useEffect, useState } from "react";
import ApiBase from "../services/ApiBase/ApiBase"


export const CustomerContext = createContext();

const CustomerContextProvider = (props) => {

  const [allCustomers, setAllCustomers] = useState([]);

  const [customers, dispatch] = useReducer(CustomerReducer, [], () => {


    const localData = localStorage.getItem("customers");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {

    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  return (
    <CustomerContext.Provider value={{ customers, dispatch }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;
