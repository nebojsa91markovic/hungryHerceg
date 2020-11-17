import React from 'react';
import AllPolls from '../AllPolls/AllPolls';

const Home = () => {
    return ( <div className="main">
        <button>Active Polls</button>
        <button>Create Poll</button>
        <button>Active Order</button>
        <button>Create order</button>

        {/* active polls true */}
        <AllPolls />
    </div> );
}
 
export default Home;