import React, { useEffect, useState, useContext } from "react";
import OrdersCollection from "../../collections/OrdersCollection";
import OrderItem from "../OrderItem/OrderItem";
import { useCookies } from "react-cookie";
import { OrdersContext } from "../../Context/OrdersContext";

const AllOrders = () => {
  const [cookies] = useCookies(["user"]);

  const { orders, dispatchOrders } = useContext(OrdersContext);

  //   const [orders, setOrders] = useState([]);

  //   const getAllOrders = () => {
  //     let arrAllOrders = [];
  //     OrdersCollection.get().then(function (querySnapshot) {
  //       querySnapshot.forEach(function (doc) {
  //         arrAllOrders.push(doc.data());
  //       });
  //       setOrders(arrAllOrders);
  //     });
  //   };

  //   useEffect(() => {
  //    // getAllOrders();
  //     console.log(orders)
  //   }, []);

  return (
    <div className="allPolls">
      <div className="orderItem-header">
        <span>Name </span>
        <span>Ends in</span>
        <span>Ordered</span>
      </div>
      {orders.map((order, index) => (
        <OrderItem order={order} id={cookies.user} index={index} />
      ))}
    </div>
  );
};

export default AllOrders;
