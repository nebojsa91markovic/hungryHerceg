import React from 'react'
import { Link } from 'react-router-dom'
import './style.css';

const OrderItem = ({ order }) => {
    return (
        <Link className="orderItem" to={`/order/${order.restaurantId}`}>
            <h3>Name: {order.label}</h3>
            <span>Status: {order.active + ''}</span>
        </Link>
    )
}

export default OrderItem