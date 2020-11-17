import React from 'react';
import ActivePolls from "./ActivePolls/ActivePolls"

const Home = () => {
    return ( <div className="main">
        <button>Active Polls</button>
        <button>Create Poll</button>
        <button>Create order</button>

        {/* active polls true */}
        <ActivePolls />
    </div> );
}
 
export default Home;