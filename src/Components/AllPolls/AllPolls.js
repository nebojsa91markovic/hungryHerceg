import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PollsCollection from "../../collections/PollsCollection"

const AllPolls = () => {

    const [polls, setPolls] = useState([])
    const finishOrder = () => {
        PollsCollection.doc('1c207585-ee01-4b1d-94d1-f4fb694e4191').update({
            active: false
        })
    }

    const getAllPolls = () => {
        let arrAllPolls = [];
        PollsCollection.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    arrAllPolls.push(doc.data());
                });
                console.log(arrAllPolls);
                setPolls(arrAllPolls)
                console.log(polls);
            });
    }

    useEffect(() => {
        getAllPolls()
    }, [])


    return (
        <div className="allPolls">
            {polls.map(poll => <Link to={`/poll/${poll.id}`}><li>NAME: {poll.label} || STATUS: {poll.active + ''}</li></Link>)
            }
        </div >
    );
}

export default AllPolls;