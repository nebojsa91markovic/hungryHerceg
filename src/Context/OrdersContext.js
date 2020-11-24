import React, { createContext, useReducer } from "react";
import { OrdersReducer } from "../Reducers/OrdersReducer";

export const OrdersContext = createContext();

const OrdersContextProvider = (props) => {
  const [orders, dispatchOrders] = useReducer(OrdersReducer, []);

  return (
    <OrdersContext.Provider value={{ orders, dispatchOrders }}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersContextProvider;
