import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiBase from "../../services/ApiBase/ApiBase";
import ApiKey from "../../services/ApiKey/ApiKey"
import "./style.css";
import PollsCollection from "../../collections/PollsCollection"
import OrdersCollection from "../../collections/OrdersCollection"
import firebase from 'firebase/app'
import { useCookies } from "react-cookie";


const ViewPoll = () => {
    const [cookies, setCookie] = useCookies(["user"]);

    const pollId = useParams().pollId;
    const [poll, setPoll] = useState([]);
    const [allPolls, setAllPolls] = useState([]);
    const [vote, setVote] = useState('');

    const config = {
        headers: {
            "Authorization": "Bearer " + ApiKey
        }
    };

    const addOrder =  () => {
    
        OrdersCollection.doc().set({
          created: 'now',
          createBy: 'tesla@tesla.com',
          label: 'pollName',
          restaurantId: '20ce30a6-fe28-s4c75-a37a-5499851af079',
          active: true,
          allMeals: []
        }, {merge: true})
        .then(() => {
          console.log('order upisan')
          });
        }

    const finishPoll = () => {
        PollsCollection.doc(pollId).get()
        .then(response => {
            if(response.data().createBy === cookies.user){
                PollsCollection.doc(pollId).update({
                    active: false
                })
            }
            else alert('nisi admin')
        })
    }


    const addVote = (event) => {
  event.preventDefault();
        PollsCollection.doc(pollId).get()
        .then(response => {
          return response.data()
        })
        .then(data => {
          let newRestaurantVoteState = [...data.restaurants];
          let prevState = [...data.restaurants]

          newRestaurantVoteState = newRestaurantVoteState.filter(restaurant => restaurant.restaurantId === vote);

          let index = prevState.indexOf(newRestaurantVoteState[0])
        
        newRestaurantVoteState[0].votes += 1;
          prevState[index] = newRestaurantVoteState[0]
        
            if(data.active) {
                PollsCollection.doc(pollId).update({
                    restaurants: prevState,
                    voters: firebase.firestore.FieldValue.arrayUnion('dusan')
                  })
            }

         
        
        })
    }

    const getPoll = () => {
        console.log(pollId)

        PollsCollection.doc(pollId).get()
        .then(response => {
            setPoll(response.data())
        })
    }

    useEffect(() => {

        getPoll();
        // axios.get(`${ApiBase}polls/${pollId}`)
        //     .then(response => {
        //         console.log(response.data)
        //         setPoll(response.data);
        //     });
    }, [pollId]);

    // useEffect(() => {
    //     axios.get(`${ApiBase}polls`, config)
    //         .then(response => {
    //             console.log(response.data);
    //             setAllPolls(response.data);
    //         })
    // }, []);



    const submitVote = (e) => {

        e.preventDefault();


    }

    return (

        <div className="polls">
            <form onSubmit={addVote}>
                <h3>{poll.label}</h3>
                {/* vote mode */}
                <div className="restaurantList">
                    <ul className="poll-vote-list">
                        {poll.restaurants && poll.restaurants.map(restaurant => <li key={restaurant.restaurantId}><label htmlFor={restaurant.restaurantId}>{restaurant.restaurantName}</label><input type="radio" id={restaurant.restaurantId} name="restaurant" value={restaurant.restaurantId} onChange={(e) => setVote(e.target.value)} /></li>)}
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
            <button onClick={finishPoll}>Zavrsi anketu</button>
        </div>
    );
}

export default ViewPoll;