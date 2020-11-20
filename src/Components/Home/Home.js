import React from 'react';
import { Link } from 'react-router-dom';
import AllPolls from '../AllPolls/AllPolls';
import CreateRestaurant from "../CreateRestaurant/CreateRestaurant"
import CreateRestaurantDatabase from "../CreateRestaurantDatabase/CreateRestaurantDatabase"
import "./style.css"

const Home = () => {
    return (

        <div className="main">
            <Link className="pollButton" to="/polls">Active Polls</Link>
            <Link  className="pollButton" to="/create-poll">Create Poll</Link>
            <Link  className="pollButton" to="/orders">Active Orders</Link>
            <Link  className="pollButton" to="/create-order">Create Order</Link>
            {/* <CreateRestaurant />
        <CreateRestaurantDatabase /> */}
            {/* active polls true */}
            {/* <AllPolls /> */}
        </div>

    );
}

export default Home;