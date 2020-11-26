import React, { useContext } from "react";
import OrderItem from "../OrderItem/OrderItem";
import { useCookies } from "react-cookie";
import { OrdersContext } from "../../Context/OrdersContext";

const AllOrders = () => {
  const [cookies] = useCookies(["user"]);

  const { orders } = useContext(OrdersContext);

  return (
    <div className="allPolls">
      <div className="orderItem">
        <h3>Name: </h3>
        <span>Ends in:</span>
        <span>Ordered:</span>
      </div>
      {orders.map((order, index) => (
        <OrderItem order={order} id={cookies.user} index={index} />
      ))}
    </div>
  );
};

export default AllOrders;
