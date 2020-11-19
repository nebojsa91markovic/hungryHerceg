import React from 'react';
import AllPolls from '../AllPolls/AllPolls';
import CreateRestaurant from "../CreateRestaurant/CreateRestaurant"
import CreateRestaurantDatabase from "../CreateRestaurantDatabase/CreateRestaurantDatabase"

const Home = () => {
    return (
        <div className="main">
            <button>Active Polls</button>
            <button>Create Poll</button>
            <button>Active Order</button>
            <button>Create order</button>
            <CreateRestaurant />
            <CreateRestaurantDatabase />
            {/* active polls true */}
            <AllPolls />
        </div>
    );
}

export default Home;