import React, { useEffect, useState } from 'react';
import CountdownTimer from "react-component-countdown-timer";
// import moment from 'moment';
import "../../../node_modules/react-component-countdown-timer/lib/styles.css";
import PollsCollection from "../../collections/PollsCollection";


const Timer = ({duration, pollId}) => {


    const finishPoll = () => {
        PollsCollection.doc(pollId).get()
        .then(response => {
                PollsCollection.doc(pollId).update({
                    active: false
                })
                alert('Anketa je istekla');
        })
    }



    const endPoll = () => {
        finishPoll();
    }


    return (
        <div className="timer">
            <small>Time left</small>
            <CountdownTimer count={duration} border hideDay hideHours onEnd={endPoll}/>
       </div>
    );

}

export default Timer;
