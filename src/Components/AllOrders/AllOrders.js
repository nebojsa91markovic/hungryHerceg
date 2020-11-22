import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrdersCollection from "../../collections/OrdersCollection"

const AllOrders = () => {

    const [orders, setOrders] = useState([])

    const getAllOrders = () => {
        let arrAllOrders = [];
        OrdersCollection.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    arrAllOrders.push(doc.data());
                });
                setOrders(arrAllOrders)
            });
    }

    useEffect(() => {
        getAllOrders()
        console.log(orders);
    }, [])


    return (
        <div className="allPolls">
            {orders.map(order => <Link to={`/order/${order.restaurantId}`}><li>NAME: {order.label} || STATUS: {order.active + ''}</li></Link>)}
        </div >
    );
}

export default AllOrders;