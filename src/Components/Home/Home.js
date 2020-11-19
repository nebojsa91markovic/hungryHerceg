import React from 'react';
import { Link } from 'react-router-dom';
import AllPolls from '../AllPolls/AllPolls';
import CreateRestaurant from "../CreateRestaurant/CreateRestaurant"
import CreateRestaurantDatabase from "../CreateRestaurantDatabase/CreateRestaurantDatabase"

const Home = () => {
    return (

        <div className="main">
            <Link to="/polls">Active Polls</Link>
            <Link to="/create-poll">Create Poll</Link>
            <Link to="/orders">Active Orders</Link>
            <Link to="/create-order">Create Order</Link>
            {/* <CreateRestaurant />
        <CreateRestaurantDatabase /> */}
            {/* active polls true */}
            <AllPolls />
        </div>

    );
}

export default Home;