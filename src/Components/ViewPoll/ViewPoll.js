import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiBase from "../../services/ApiBase/ApiBase";
import ApiKey from "../../services/ApiKey/ApiKey"
import "./style.css";

const ViewPoll = () => {

    const pollId = useParams().pollId;
    const [poll, setPoll] = useState([]);
    const [allPolls, setAllPolls] = useState([]);
    const [vote, setVote] = useState('');

    const config = {
        headers: {
            "Authorization": "Bearer " + ApiKey
        }
    };

    useEffect(() => {
        axios.get(`${ApiBase}polls/${pollId}`)
            .then(response => {
                console.log(response.data)
                setPoll(response.data);
            });
    }, [pollId]);

    useEffect(() => {
        axios.get(`${ApiBase}polls`, config)
            .then(response => {
                console.log(response.data);
                setAllPolls(response.data);
            })
    }, []);



    const submitVote = (e) => {

        e.preventDefault();


    }

    return (

        <div className="polls">
            <form onSubmit={submitVote}>
                <h3>{poll.label}</h3>
                {/* vote mode */}
                <div className="restaurantList">
                    <ul className="poll-vote-list">
                        {poll.restaurants && poll.restaurants.map(restaurant => <li key={restaurant.id}><label htmlFor={restaurant.id}>{restaurant.name}</label><input type="radio" id={restaurant.id} name="restaurant" value={restaurant.id} onChange={(e) => setVote(e.target.value)} /></li>)}
                    </ul>

                </div>
                <input type="submit" />

                {allPolls && allPolls.map(onePoll => <Link key={onePoll.id} to={`/poll/${onePoll.id}`}><h5>{onePoll.label}</h5></Link>)}

                {/* view mode */}
                <div className="restaurantList">
                    {/* loading polje da se popunjava css Bojan */}
                    <label>Ime restorana</label>
                    <span>23%</span>
                    <label>Ime restorana2</label>
                    <span>23%</span>
                    <label>Ime restorana3</label>
                    <span>23%</span>
                    <label>Ime restorana4</label>
                    <span>23%</span>
                </div>

            </form>
        </div>
    );
}

export default ViewPoll;