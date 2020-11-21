import React, { useEffect, useState } from 'react';
import PollsCollection from "../../collections/PollsCollection"

const AllPolls = () => {

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
            return arrAllPolls;
          });
    }

  
    return ( 
        <div className="allPolls">
            <ul>
                <li>Anketa 1</li>
                <li>Anketa 2</li>
                <li>Order 1 
                </li>
                <button onClick={finishOrder}>Zavrsi order</button>
            </ul>
        </div> );
}
 
export default AllPolls;