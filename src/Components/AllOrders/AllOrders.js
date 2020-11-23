import React, { useEffect, useState } from 'react';
import OrdersCollection from "../../collections/OrdersCollection"
import OrderItem from '../OrderItem/OrderItem';

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
    }, [])


    return (
        <div className="allPolls">
            {orders.map(order => <OrderItem order={order} />)}
        </div >
    );
}

export default AllOrders;